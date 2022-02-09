import { send, decode, script, args, cdc } from "@onflow/fcl"

const CODE = cdc`
import NFTStorefront from 0xNFTStorefront
import HandyItems from 0xHandyItems

pub struct NftItem {
  pub let series: HandyItems.QuerySeriesData
  pub let edition: HandyItems.QueryEditionData
  pub let set: HandyItems.QuerySetData

  init(series: HandyItems.QuerySeriesData, edition: HandyItems.QueryEditionData, 
    set: HandyItems.QuerySetData) {

    self.series = series
    self.edition = edition
    self.set = set
  }
}

pub fun main(): {UInt32: NftItem?} {
  let sets = HandyItems.getAllSets()
  let r: {UInt32: NftItem?} = {}

  for key in sets.keys {
    let set = sets[key]!

    let series = HandyItems.getSeriesData(series: set!.seriesID)
    let edition = HandyItems.getEditionData(id: set!.editionID)

    r[key] = NftItem(series: series!, edition: edition!, set: set!);
  }
  return r
}
`

export function getSetAllList() {
  // prettier-ignore
  return send([
    script(CODE),
    args()
  ]).then(decode)
}