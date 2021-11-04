import {Suspense} from "react"
import {useMarketItems} from "../hooks/use-market-items.hook"

export function MarketItemsCluster() {
  const {items} = useMarketItems("0xab5876435fbf2063");

  if (items.length == 0)
    return (
      <p>No items listed for sale</p>
    )

  return (
    <ul>
      {items.map(item => 
        <li>item</li>
      )}
    </ul>
  )
}

export default function WrappedMarketItemsCluster() {
  return (
    <Suspense fallback={null}>
      <MarketItemsCluster />
    </Suspense>
  )
}