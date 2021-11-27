import * as fcl from "@onflow/fcl"
import * as t from "@onflow/types"
import {batch} from "./util/batch"

const CODE = fcl.cdc`
import NonFungibleToken from 0xNonFungibleToken
import HandyItems from 0xHandyItems

pub struct AccountItem {
  pub let itemID: UInt64
  pub let name: String
  pub let tokenURI: String
  pub let editionID: UInt32
  pub let series: UInt32
  pub let isSerial: Bool
  pub let quantity: UInt64
  pub let price: UInt64
  pub var editionName: String
  pub let owner: Address

  init(itemID: UInt64, name: String, tokenURI: String, editionID: UInt32, series: UInt32, isSerial: Bool,
    quantity: UInt64, price: UInt64, owner: Address) {
    self.itemID = itemID
    self.name = name
    self.tokenURI = tokenURI
    self.editionID = editionID
    self.series = series
    self.isSerial = isSerial
    self.quantity = quantity
    self.price = price
    self.editionName = ""
    self.owner = owner
  }

  pub fun set(editionName: String) {
    self.editionName = editionName
  }
}

pub fun fetch(address: Address, id: UInt64): AccountItem? {
  if let col = getAccount(address).getCapability<&HandyItems.Collection{NonFungibleToken.CollectionPublic, HandyItems.HandyItemsCollectionPublic}>(HandyItems.CollectionPublicPath).borrow() {
    if let item = col.borrowHandyItem(id: id) {
      return AccountItem(itemID: id, name: item.name, tokenURI: item.tokenURI, 
        editionID: item.editionID, series: item.series, isSerial: item.isSerial,
        quantity: item.quantity, price: item.price, owner: address)
    }
  }

  return nil
}

pub fun main(keys: [String], addresses: [Address], ids: [UInt64]): {String: AccountItem?} {

  var e: {UInt32: HandyItems.QueryEditionData} = {}

  let r: {String: AccountItem?} = {}
  var i = 0

  e = HandyItems.getEditions()

  while i < keys.length {
    let key = keys[i]
    let address = addresses[i]
    let id = ids[i]
    let rkey = fetch(address: address, id: id)

    rkey!.set(editionName: e[rkey!.editionID]!.name)
    r[key] = rkey;
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
  if (address == null) return Promise.resolve(null)
  if (id == null) return Promise.resolve(null)
  return enqueue(address, id)
}
