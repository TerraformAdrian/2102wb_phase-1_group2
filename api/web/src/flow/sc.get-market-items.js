import {send, decode, script, args, arg, cdc} from "@onflow/fcl"
import {Address} from "@onflow/types"

const CODE = cdc`
import NFTStorefront from 0xNFTStorefront

pub fun main(account: Address): [UInt64] {
    let storefrontRef = getAccount(account)
        .getCapability<&NFTStorefront.Storefront{NFTStorefront.StorefrontPublic}>(
            NFTStorefront.StorefrontPublicPath
        )
        .borrow()
        ?? panic("Could not borrow public storefront from address")
    
    return storefrontRef.getSaleOfferIDs()
}
`

export function getMarketItems(address) {
  if (address === null || address === "")
    return Promise.resolve([])

  // prettier-ignore
  return send([
    script(CODE),
    args([
      arg(address, Address)
    ])
  ]).then(decode).then(d => d.sort((a, b) => a - b))
}