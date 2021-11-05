import {Suspense} from "react"
import {useMarketItem} from "../hooks/use-market-item.hook"
import {useCurrentUser} from "../hooks/use-current-user.hook"
import {IDLE} from "../global/constants"

export function MarketItemCluster({address, id}) {
  const [cu, loggedIn] = useCurrentUser()
  const item = useMarketItem(address, id)

  console.log(item);

  return (
    <div>ID: {item.itemID} name: {item.name} Image URL: {item.tokenURI} color: {item.color}</div>
  )
}

export default function WrappedMarketItemCluster(props) {
  return (
    <Suspense fallback={null}>
      <MarketItemCluster {...props} />
    </Suspense>
  )
}
