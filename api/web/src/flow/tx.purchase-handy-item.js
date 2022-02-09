import * as fcl from "@onflow/fcl"
import * as t from "@onflow/types"
import {tx} from "./util/tx"

const CODE = fcl.cdc`
  import FungibleToken from 0xFungibleToken
  import NonFungibleToken from 0xNonFungibleToken
  import FUSD from 0xFUSD
  import HandyItems from 0xHandyItems
  import NFTStorefront from 0xNFTStorefront

  transaction(setID: UInt32, storefrontAddress: Address) {

    let paymentVault: @FungibleToken.Vault
    let handyItemsCollection: &HandyItems.Collection{NonFungibleToken.Receiver}
    let set: &HandyItems.Set

    prepare(account: AuthAccount) {
      self.set = HandyItems.borrowSet(setID: setID)
      
      let price: UFix64 = self.set.price
      // let price: UFix64 = 3.0

      let mainFUSDVault = account.borrow<&FUSD.Vault>(from: /storage/fusdVault)
        ?? panic("Cannot borrow FUSD vault from account storage")
      
      self.paymentVault <- mainFUSDVault.withdraw(amount: price)

      self.handyItemsCollection = account.borrow<&HandyItems.Collection{NonFungibleToken.Receiver}>(
        from: HandyItems.CollectionStoragePath
      ) ?? panic("Cannot borrow HandyItems collection receiver from account")
    }
  
    execute {
      let item <- self.set.mintNFT(
        payment: <-self.paymentVault
      )

      self.handyItemsCollection.deposit(token: <-item)
    }
  }
`

// prettier-ignore
export function purchaseHandyItem({setID, ownerAddress}, opts = {}) {

  return tx([
    fcl.transaction(CODE),
    fcl.args([
      fcl.arg(Number(setID), t.UInt32),
      fcl.arg(String(ownerAddress), t.Address),
    ]),
    fcl.proposer(fcl.authz),
    fcl.payer(fcl.authz),
    fcl.authorizations([fcl.authz]),
    fcl.limit(1000),
  ], opts)
}
