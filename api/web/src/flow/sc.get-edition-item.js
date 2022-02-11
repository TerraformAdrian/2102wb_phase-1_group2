import { send, decode, script, args, arg, cdc } from "@onflow/fcl"
import { UInt32 } from "@onflow/types"

const CODE = cdc`
import NFTStorefront from 0xNFTStorefront
import HandyItems from 0xHandyItems

pub fun main(id: UInt32): HandyItems.QueryEditionData? {
  return HandyItems.getEditionData(id: id)
}
`

export function getEditionItem(edition) {
  // prettier-ignore
  return send([
    script(CODE),
    args([arg(Number(edition), UInt32)])
  ]).then(decode)
}