import * as fcl from "@onflow/fcl"
import * as t from "@onflow/types"
import {tx} from "./util/tx"

const CODE = fcl.cdc`
  import FungibleToken from 0xFungibleToken
  import NonFungibleToken from 0xNonFungibleToken
  import FlowToken from 0xFlowToken 
  import HandyItems from 0xHandyItems
  import NFTStorefront from 0xNFTStorefront

  transaction(saleItemID: UInt64, saleItemPrice: UFix64) {

    let flowReceiver: Capability<&FlowToken.Vault{FungibleToken.Receiver}>
    let handyItemsCollection: Capability<&HandyItems.Collection{NonFungibleToken.Provider, NonFungibleToken.CollectionPublic}>
    let storefront: &NFTStorefront.Storefront

    prepare(account: AuthAccount) {
      // We need a provider capability, but one is not provided by default so we create one if needed.
      let handyItemsCollectionProviderPrivatePath = /private/handyItemsCollectionProvider

      self.flowReceiver = account.getCapability<&FlowToken.Vault{FungibleToken.Receiver}>(/public/flowTokenReceiver)!

      assert(self.flowReceiver.borrow() != nil, message: "Missing or mis-typed FlowToken receiver")

      if !account.getCapability<&HandyItems.Collection{NonFungibleToken.Provider, NonFungibleToken.CollectionPublic}>(handyItemsCollectionProviderPrivatePath)!.check() {
        account.link<&HandyItems.Collection{NonFungibleToken.Provider, NonFungibleToken.CollectionPublic}>(handyItemsCollectionProviderPrivatePath, target: HandyItems.CollectionStoragePath)
      }

      self.handyItemsCollection = account.getCapability<&HandyItems.Collection{NonFungibleToken.Provider, NonFungibleToken.CollectionPublic}>(handyItemsCollectionProviderPrivatePath)!
      assert(self.handyItemsCollection.borrow() != nil, message: "Missing or mis-typed HandyItemsCollection provider")
      
      self.storefront = account.borrow<&NFTStorefront.Storefront>(from: NFTStorefront.StorefrontStoragePath)
        ?? panic("Missing or mis-typed NFTStorefront Storefront")
    }

    execute {
      let saleCut = NFTStorefront.SaleCut(
        receiver: self.flowReceiver,
        amount: saleItemPrice
      )

      self.storefront.createSaleOffer(
        nftProviderCapability: self.handyItemsCollection,
        nftType: Type<@HandyItems.NFT>(),
        nftID: saleItemID,
        salePaymentVaultType: Type<@FlowToken.Vault>(),
        saleCuts: [saleCut]
      )
    }
  }

`

export function createSaleOffer({itemID, price}, opts = {}) {
  if (itemID == null)
    throw new Error("createSaleOffer(itemID, price) -- itemID required")
  if (price == null)
    throw new Error("createSaleOffer(itemID, price) -- price required")

  // prettier-ignore
  return tx([
    fcl.transaction(CODE),
    fcl.args([
      fcl.arg(Number(itemID), t.UInt64),
      fcl.arg(String(price), t.UFix64),
    ]),
    fcl.proposer(fcl.authz),
    fcl.payer(fcl.authz),
    fcl.authorizations([
      fcl.authz
    ]),
    fcl.limit(1000)
  ], opts)
}
