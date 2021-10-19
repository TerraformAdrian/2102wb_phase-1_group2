import * as fcl from "@onflow/fcl"
import {Address} from "@onflow/types"

const CODE = fcl.cdc`
  import NonFungibleToken from 0xf8d6e0586b0a20c7
  import HandyItems from 0xf8d6e0586b0a20c7

  pub fun main(address: Address): [UInt64] {
    if let collection =  getAccount(address).getCapability<&HandyItems.Collection{NonFungibleToken.CollectionPublic, HandyItems.HandyItemsCollectionPublic}>(HandyItems.CollectionPublicPath).borrow() {
      return collection.getIDs()
    }

    return []
  }
`

export function fetchAccountItems(address) {
  if (address == null) return Promise.resolve([])

  // prettier-ignore
  return fcl.send([
    fcl.script(CODE),
    fcl.args([
      fcl.arg(address, Address)
    ]),
  ]).then(fcl.decode).then(d => d.sort((a, b) => a - b))
}
