import NonFungibleToken from "../../contracts/NonFungibleToken.cdc"
import HandyItems from "../../contracts/HandyItems.cdc"

// This transaction configures an account to hold Handy Items.

transaction {
    prepare(signer: AuthAccount) {
        // if the account doesn't already have a collection
        if signer.borrow<&HandyItems.Collection>(from: HandyItems.CollectionStoragePath) == nil {

            // create a new empty collection
            let collection <- HandyItems.createEmptyCollection()
            
            // save it to the account
            signer.save(<-collection, to: HandyItems.CollectionStoragePath)

            // create a public capability for the collection
            signer.link<&HandyItems.Collection{NonFungibleToken.CollectionPublic, HandyItems.HandyItemsCollectionPublic}>(HandyItems.CollectionPublicPath, target: HandyItems.CollectionStoragePath)
        }
    }
}
