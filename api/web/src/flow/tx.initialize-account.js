// prettier-ignore
import {transaction, limit, proposer, payer, authorizations, authz, cdc} from "@onflow/fcl"
import {invariant} from "@onflow/util-invariant"
import {tx} from "./util/tx"

const CODE = cdc`
  import FungibleToken from 0xFungibleToken
  import FUSD from 0xFUSD
  import NonFungibleToken from 0xNonFungibleToken
  import HandyItems from 0xHandyItems
  import NFTStorefront from 0xNFTStorefront

  pub fun hasItems(_ address: Address): Bool {
    return getAccount(address)
      .getCapability<&HandyItems.Collection{NonFungibleToken.CollectionPublic, HandyItems.HandyItemsCollectionPublic}>(HandyItems.CollectionPublicPath)
      .check()
  }

  pub fun hasFUSD(_ address: Address): Bool {
    let receiver = getAccount(address)
      .getCapability<&FUSD.Vault{FungibleToken.Receiver}>(/public/fusdReceiver)
      .check()

    let balance = getAccount(address)
      .getCapability<&FUSD.Vault{FungibleToken.Balance}>(/public/fusdBalance)
      .check()

    return receiver && balance
  }

  pub fun hasStorefront(_ address: Address): Bool {
    return getAccount(address)
      .getCapability<&NFTStorefront.Storefront{NFTStorefront.StorefrontPublic}>(NFTStorefront.StorefrontPublicPath)
      .check()
  }

  transaction {
    prepare(acct: AuthAccount) {
      if !hasFUSD(acct.address) {
        if acct.borrow<&FUSD.Vault>(from: /storage/fusdVault) == nil {
          acct.save(<-FUSD.createEmptyVault(), to: /storage/fusdVault)
        }
        acct.unlink(/public/fusdReceiver)
        acct.unlink(/public/fusdBalance)
        acct.link<&FUSD.Vault{FungibleToken.Receiver}>(/public/fusdReceiver, target: /storage/fusdVault)
        acct.link<&FUSD.Vault{FungibleToken.Balance}>(/public/fusdBalance, target: /storage/fusdVault)
      }

      if !hasItems(acct.address) {
        if acct.borrow<&HandyItems.Collection>(from: HandyItems.CollectionStoragePath) == nil {
          acct.save(<-HandyItems.createEmptyCollection(), to: HandyItems.CollectionStoragePath)
        }
        acct.unlink(HandyItems.CollectionPublicPath)
        acct.link<&HandyItems.Collection{NonFungibleToken.CollectionPublic, HandyItems.HandyItemsCollectionPublic}>(HandyItems.CollectionPublicPath, target: HandyItems.CollectionStoragePath)
      }
/*
      if !hasStorefront(acct.address) {
        if acct.borrow<&NFTStorefront.Storefront>(from: NFTStorefront.StorefrontStoragePath) == nil {
          acct.save(<-NFTStorefront.createStorefront(), to: NFTStorefront.StorefrontStoragePath)
        }
        acct.unlink(NFTStorefront.StorefrontPublicPath)
        acct.link<&NFTStorefront.Storefront{NFTStorefront.StorefrontPublic}>(NFTStorefront.StorefrontPublicPath, target: NFTStorefront.StorefrontStoragePath)
      } */
    }
  }
`

export async function initializeAccount(address, opts = {}) {
  // prettier-ignore
  invariant(address != null, "Tried to initialize an account but no address was supplied")

  return tx(
    [
      transaction(CODE),
      limit(70),
      proposer(authz),
      payer(authz),
      authorizations([authz]),
    ],
    opts
  )
}
