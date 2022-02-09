import {Suspense} from "react"
import {useMarketItem} from "../hooks/use-market-item.hook"

export function MarketItemCluster({address, id}) {
  const item = useMarketItem(address, id)

  return (
    <div>
      <div className="grid-list">
        <h3>Handy#{item.itemID}</h3>

        <p>{item.name}</p>
        <p>{item.tokenURI}</p>
        <p>{item.color}</p>
        <p>{item.info}</p>
        <button 
          onClick={() => item.buy()}
        >
          Buy
        </button>
     </div>
    </div>
  )
}

export default function WrappedMarketItemCluster(props) {
  return (
    <Suspense fallback={null}>
      <MarketItemCluster {...props} />
    </Suspense>
  )
}
