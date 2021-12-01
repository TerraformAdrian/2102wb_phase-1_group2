import {Suspense} from "react"
import { useSeriesList } from "../hooks/use-series-list.hook"

export function SeriesItemsCluster() {
  const items = useSeriesList()

  return (
    <div>
    </div>
  )
}

export default function WrappedSeriesItemsCluster() {
  return (
    <Suspense fallback={null}>
      <SeriesItemsCluster />
    </Suspense>
  )
}
