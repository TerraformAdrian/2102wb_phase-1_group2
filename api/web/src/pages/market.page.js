
import {useCurrentUser} from "../hooks/use-current-user.hook"
import {Suspense, useState} from "react"
import {Redirect, useHistory} from "react-router-dom"
import MarketItems from "../comps/market-items"

export function Page() {
  const history = useHistory();
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
