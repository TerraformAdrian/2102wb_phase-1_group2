
import {IDLE} from "../global/constants"
import {useCurrentUser} from "../hooks/use-current-user.hook"
import {useAccountItems} from "../hooks/use-account-items.hook"
import {Suspense} from "react"
import {Redirect, useHistory} from "react-router-dom"

import './list.css'

export function Page() {

  const history = useHistory();
  const [user] = useCurrentUser()

  if (user.addr == null) return <Redirect to={"/"} />

  return (
    <div>
      <h1>NFT Listings</h1>
	    <div className="grid-container">
	    </div>
    </div>
  )
}
