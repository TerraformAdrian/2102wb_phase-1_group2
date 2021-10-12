import NonFungibleToken from "./NonFungibleToken.cdc"

// HandyItems
//
pub contract HandyItems: NonFungibleToken {

    // Events
    //
    pub event ContractInitialized()
    pub event Withdraw(id: UInt64, from: Address?)
    pub event Deposit(id: UInt64, to: Address?)
    pub event Minted(id: UInt64, name: String,
    				 tokenURI: String, color: String, info: String)

    // Named Paths
    //
    pub let CollectionStoragePath: StoragePath
    pub let CollectionPublicPath: PublicPath
    pub let MinterStoragePath: StoragePath

    // totalSupply
    // The total number of HandyItems that have been minted
    //
    pub var totalSupply: UInt64

    // NFT
    // A Handy Item as an NFT
    //
    pub resource NFT: NonFungibleToken.INFT {
        // The token's ID
        pub let id: UInt64
        // The token's name
        pub let name: String
        // The token's url
        pub let tokenURI: String
        // The token's color
        pub let color: String
        // The token's info
        pub let info: String

        // initializer
        //
        init(initID: UInt64, 
        	initName: String,
        	initUrl: String,
        	initColor: String,
        	initInfo: String) {
            self.id = initID
            self.name = initName
            self.tokenURI = initUrl
            self.color = initColor
            self.info = initInfo
        }
    }

    // This is the interface that users can cast their HandyItems Collection as
    // to allow others to deposit HandyItems into their Collection. It also allows for reading
    // the details of HandyItems in the Collection.
    pub resource interface HandyItemsCollectionPublic {
        pub fun deposit(token: @NonFungibleToken.NFT)
        pub fun getIDs(): [UInt64]
        pub fun borrowNFT(id: UInt64): &NonFungibleToken.NFT
        pub fun borrowHandyItem(id: UInt64): &HandyItems.NFT? {
            // If the result isn't nil, the id of the returned reference
            // should be the same as the argument to the function
            post {
                (result == nil) || (result?.id == id):
                    "Cannot borrow HandyItem reference: The ID of the returned reference is incorrect"
            }
        }
    }

    // Collection
    // A collection of HandyItem NFTs owned by an account
    //
    pub resource Collection: HandyItemsCollectionPublic, NonFungibleToken.Provider, NonFungibleToken.Receiver, NonFungibleToken.CollectionPublic {
        // dictionary of NFT conforming tokens
        // NFT is a resource type with an `UInt64` ID field
        //
        pub var ownedNFTs: @{UInt64: NonFungibleToken.NFT}

        // withdraw
        // Removes an NFT from the collection and moves it to the caller
        //
        pub fun withdraw(withdrawID: UInt64): @NonFungibleToken.NFT {
            let token <- self.ownedNFTs.remove(key: withdrawID) ?? panic("missing NFT")

            emit Withdraw(id: token.id, from: self.owner?.address)

            return <-token
        }

        // deposit
        // Takes a NFT and adds it to the collections dictionary
        // and adds the ID to the id array
        //
        pub fun deposit(token: @NonFungibleToken.NFT) {
            let token <- token as! @HandyItems.NFT

            let id: UInt64 = token.id

            // add the new token to the dictionary which removes the old one
            let oldToken <- self.ownedNFTs[id] <- token

            emit Deposit(id: id, to: self.owner?.address)

            destroy oldToken
        }

        // getIDs
        // Returns an array of the IDs that are in the collection
        //
        pub fun getIDs(): [UInt64] {
            return self.ownedNFTs.keys
        }

        // borrowNFT
        // Gets a reference to an NFT in the collection
        // so that the caller can read its metadata and call its methods
        //
        pub fun borrowNFT(id: UInt64): &NonFungibleToken.NFT {
            return &self.ownedNFTs[id] as &NonFungibleToken.NFT
        }

        // borrowHandyItem
        // Gets a reference to an NFT in the collection as a HandyItem,
        // exposing all of its fields (including the typeID).
        // This is safe as there are no functions that can be called on the HandyItem.
        //
        pub fun borrowHandyItem(id: UInt64): &HandyItems.NFT? {
            if self.ownedNFTs[id] != nil {
                let ref = &self.ownedNFTs[id] as auth &NonFungibleToken.NFT
                return ref as! &HandyItems.NFT
            } else {
                return nil
            }
        }

        // destructor
        destroy() {
            destroy self.ownedNFTs
        }

        // initializer
        //
        init () {
            self.ownedNFTs <- {}
        }
    }

    // createEmptyCollection
    // public function that anyone can call to create a new empty collection
    //
    pub fun createEmptyCollection(): @NonFungibleToken.Collection {
        return <- create Collection()
    }

    // NFTMinter
    // Resource that an admin or something similar would own to be
    // able to mint new NFTs
    //
	pub resource NFTMinter {

		// mintNFT
        // Mints a new NFT with a new ID
		// and deposit it in the recipients collection using their collection reference
        //
		pub fun mintNFT(recipient: &{NonFungibleToken.CollectionPublic}, 
			name: String, toeknURI: String, color: String, info: String) {
            emit Minted(id: HandyItems.totalSupply, name: name, tokenURI: tokenURI, color: color, info: info)

			// deposit it in the recipient's account using their reference
			recipient.deposit(token: <-create HandyItems.NFT(initID: HandyItems.totalSupply, initName: name, initUrl: tokenURI, initColor: color, initInfo: info))

            HandyItems.totalSupply = HandyItems.totalSupply + (1 as UInt64)
		}
	}

    // fetch
    // Get a reference to a HandyItem from an account's Collection, if available.
    // If an account does not have a HandyItems.Collection, panic.
    // If it has a collection but does not contain the itemID, return nil.
    // If it has a collection and that collection contains the itemID, return a reference to that.
    //
    pub fun fetch(_ from: Address, itemID: UInt64): &HandyItems.NFT? {
        let collection = getAccount(from)
            .getCapability(HandyItems.CollectionPublicPath)!
            .borrow<&HandyItems.Collection{HandyItems.HandyItemsCollectionPublic}>()
            ?? panic("Couldn't get collection")
        // We trust HandyItems.Collection.borowHandyItem to get the correct itemID
        // (it checks it before returning it).
        return collection.borrowHandyItem(id: itemID)
    }

    // initializer
    //
	init() {
        // Set our named paths
        self.CollectionStoragePath = /storage/HandyItemsCollection
        self.CollectionPublicPath = /public/HandyItemsCollection
        self.MinterStoragePath = /storage/HandyItemsMinter

        // Initialize the total supply
        self.totalSupply = 0

        // Create a Minter resource and save it to storage
        let minter <- create NFTMinter()
        self.account.save(<-minter, to: self.MinterStoragePath)

        emit ContractInitialized()
	}
}
