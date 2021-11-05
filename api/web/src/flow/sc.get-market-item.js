import { send, script, args, arg, decode } from "@onflow/fcl"
import { Address, UInt64 } from "@onflow/types"

export async function getMarketItem(address, id) {
  return send([
      script`
        import HandyItems from 0xHandyItems
        import NonFungibleToken from 0xNonFungibleToken
        import NFTStorefront from 0xNFTStorefront

        pub struct SaleItem {
          pub let itemID: UInt64
          pub let name: String
          pub let tokenURI: String
          pub let color: String
          pub let info: String
          pub let owner: Address
          pub let price: UFix64

          init(itemID: UInt64, name: String, tokenURI: String, color: String,info: String, owner: Address, price: UFix64) {
            self.itemID = itemID
            self.name = name
            self.tokenURI = tokenURI
            self.color = color
            self.info = info
            self.owner = owner
            self.price = price
          }
        }

        pub fun main(address: Address, saleOfferResourceID: UInt64): SaleItem? {
          let account = getAccount(address)

          if let storefrontRef = account.getCapability<&NFTStorefront.Storefront{NFTStorefront.StorefrontPublic}>(NFTStorefront.StorefrontPublicPath).borrow() {
            if let saleOffer = storefrontRef.borrowSaleOffer(saleOfferResourceID: saleOfferResourceID) {
              let details = saleOffer.getDetails()

              let itemID = details.nftID
              let itemPrice = details.salePrice

              if let collection = account.getCapability<&HandyItems.Collection{NonFungibleToken.CollectionPublic, HandyItems.HandyItemsCollectionPublic}>(HandyItems.CollectionPublicPath).borrow() {
                if let item = collection.borrowHandyItem(id: itemID) {
                  return SaleItem(itemID: itemID, name: item.name, tokenURI: item.tokenURI, 
                    color: item.color, info: item.info, owner: address, price: itemPrice)
                }
              }
            }
          }
            
          return nil
        }
    `,
      args([arg(address, Address), arg(Number(id), UInt64)]),
    ])
    .then(decode)
}
