import {send, decode, script, args, arg, cdc} from "@onflow/fcl"
import {Address, UInt32} from "@onflow/types"

const CODE = cdc`
import NFTStorefront from 0xNFTStorefront
import HandyItems from 0xHandyItems

pub fun main(id: UInt32): HandyItems.QuerySetData? {
  return HandyItems.getSetData(setID: id)
}
`

export function getSetItem(series) {
  // prettier-ignore
  return send([
    script(CODE),
    args([arg(Number(series), UInt32)])
  ]).then(decode)
}