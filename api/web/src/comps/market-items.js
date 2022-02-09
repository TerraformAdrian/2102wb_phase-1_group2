import {Suspense} from "react"
import {useMarketItems} from "../hooks/use-market-items.hook"
import Item from './market-item'

export function MarketItemsCluster() {
  const {items} = useMarketItems("0x048ac6df55e9c6e6");

  if (items.length === 0)
    return (
      <p>No items listed for sale</p>
    )

  return (
    <div>
      <h1>NFT Marketplace</h1>
      <div className="grid-list">
        <h2>ID</h2>
        <h2>Name</h2>
        <h2>Image URL</h2>
        <h2>Color</h2>
        <h2>Info</h2>
      </div>
      {items.map(item => 
          <Item
            key={item}
            id={item}
            address={"0x048ac6df55e9c6e6"}
          />
      )}
    </div>
  )
}

export default function WrappedMarketItemsCluster() {
  return (
    <Suspense fallback={null}>
      <MarketItemsCluster />
    </Suspense>
  )
}