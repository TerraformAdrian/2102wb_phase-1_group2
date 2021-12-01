import {send, decode, script, args, arg, cdc} from "@onflow/fcl"
import {Address} from "@onflow/types"

const CODE = cdc`
import NFTStorefront from 0xNFTStorefront
import HandyItems from 0xHandyItems

pub fun main(): {UInt32: HandyItems.QuerySeriesData} {
  return HandyItems.getSeries()
}
`

export function getSeriesList() {
  // prettier-ignore
  return send([
    script(CODE),
    args()
  ]).then(decode)
}