import * as fcl from "@onflow/fcl"
import * as t from "@onflow/types"
import {batch} from "./util/batch"

const CODE = fcl.cdc`
import NonFungibleToken from 0xNonFungibleToken
import HandyItems from 0xHandyItems

pub struct AccountItem {
  pub let itemID: UInt64
  pub let setID: UInt32
  pub let serialID: UInt32
  pub let owner: Address

  init(itemID: UInt64, setID: UInt32, serialID: UInt32, owner: Address) {
    self.itemID = itemID
    self.setID = setID
    self.serialID = serialID
    self.owner = owner
  }
}

pub struct NftItem {
  pub let series: HandyItems.QuerySeriesData
  pub let edition: HandyItems.QueryEditionData
  pub let set: HandyItems.QuerySetData
  pub let item: AccountItem

  init(series: HandyItems.QuerySeriesData, edition: HandyItems.QueryEditionData, 
    set: HandyItems.QuerySetData, item: AccountItem) {

    self.series = series
    self.edition = edition
    self.set = set
    self.item = item
  }
}

pub fun fetch(address: Address, id: UInt64): AccountItem? {
  if let col = getAccount(address).getCapability<&HandyItems.Collection{NonFungibleToken.CollectionPublic, HandyItems.HandyItemsCollectionPublic}>(HandyItems.CollectionPublicPath).borrow() {
    if let item = col.borrowHandyItem(id: id) {
      return AccountItem(itemID: id, setID: item.setID, serialID: item.serialID, owner: address)
    }
  }

  return nil
}

pub fun main(keys: [String], addresses: [Address], ids: [UInt64]): {String: NftItem?} {
  let r: {String: NftItem?} = {}
  var i = 0

  while i < keys.length {
    let key = keys[i]
    let address = addresses[i]
    let id = ids[i]

    let rkey = fetch(address: address, id: id)
    let set = HandyItems.getSetData(setID: rkey!.setID)
    let series = HandyItems.getSeriesData(series: set!.seriesID)
    let edition = HandyItems.getEditionData(id: set!.editionID)

    r[key] = NftItem(series: series!, edition: edition!, set: set!, item: rkey!);
    i = i + 1
  }
  return r
}
`

const collate = px => {
  return Object.keys(px).reduce(
    (acc, key) => {
      acc.keys.push(key)
      acc.addresses.push(px[key][0])
      acc.ids.push(px[key][1])
      return acc
    },
    {keys: [], addresses: [], ids: []}
  )
}

const {enqueue} = batch("FETCH_ACCOUNT_ITEM", async px => {
  const {keys, addresses, ids} = collate(px)

  return fcl
    .send([
      fcl.script(CODE),
      fcl.args([
        fcl.arg(keys, t.Array(t.String)),
        fcl.arg(addresses, t.Array(t.Address)),
        fcl.arg(ids.map(Number), t.Array(t.UInt64)),
      ]),
    ])
    .then(fcl.decode)
})

export async function fetchAccountItem(address, id) {
  if (address == null || address === "") return Promise.resolve(null)
  if (id == null) return Promise.resolve(null)
  return enqueue(address, id)
}
