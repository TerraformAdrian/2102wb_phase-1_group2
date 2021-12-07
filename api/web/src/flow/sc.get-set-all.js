import {send, decode, script, args, arg, cdc} from "@onflow/fcl"
import {Address, UInt32} from "@onflow/types"

const CODE = cdc`
import NFTStorefront from 0xNFTStorefront
import HandyItems from 0xHandyItems

pub fun main(): {UInt32: HandyItems.QuerySetEditionData} {
  return HandyItems.getAllSets()
}
`

export function getSetAllList() {
  // prettier-ignore
  return send([
    script(CODE),
    args()
  ]).then(decode)
}