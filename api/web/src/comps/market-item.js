import {Suspense} from "react"
import {useMarketItem} from "../hooks/use-market-item.hook"
import {useCurrentUser} from "../hooks/use-current-user.hook"
import {IDLE} from "../global/constants"

export function MarketItemCluster({address, id}) {
  const [cu, loggedIn] = useCurrentUser()
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
