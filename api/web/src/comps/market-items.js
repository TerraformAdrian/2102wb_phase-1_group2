import {Suspense} from "react"
import {useMarketItems} from "../hooks/use-market-items.hook"
import Item from './market-item'

export function MarketItemsCluster() {
  const {items} = useMarketItems("0x048ac6df55e9c6e6");

  if (items.length == 0)
    return (
      <p>No items listed for sale</p>
    )

  return (
    <ul>
      {items.map(item => 
        <Item
          key={item}
          id={item}
          address={"0x048ac6df55e9c6e6"}
        />
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