import { send, decode, script, args, arg, cdc } from "@onflow/fcl"
import { UInt32 } from "@onflow/types"

const CODE = cdc`
import NFTStorefront from 0xNFTStorefront
import HandyItems from 0xHandyItems

pub fun main(series: UInt32): {UInt32: HandyItems.QueryEditionData} {
  return HandyItems.getEditions(series: series)
}
`

export function getEditionList(series) {
  // prettier-ignore
  return send([
    script(CODE),
    args([arg(Number(series), UInt32)])
  ]).then(decode)
}