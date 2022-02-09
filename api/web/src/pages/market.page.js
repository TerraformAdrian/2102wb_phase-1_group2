
import {useCurrentUser} from "../hooks/use-current-user.hook"
import MarketItems from "../comps/market-items"

export function Page() {
  const [user] = useCurrentUser()

  // if (user.addr == null) return <Redirect to={"/"} />

  return (
    <div>
      <h1>
        {user.addr}
      </h1>
      <MarketItems />
    </div>
  )
}
