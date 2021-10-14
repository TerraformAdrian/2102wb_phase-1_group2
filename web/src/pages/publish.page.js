
import {IDLE} from "../global/constants"
import {useCurrentUser} from "../hooks/use-current-user.hook"
import {useAccountItems} from "../hooks/use-account-items.hook"
import {Suspense} from "react"
import {Redirect, useHistory} from "react-router-dom"

import './publish.css'

export function MintButton({address}) {
  const items = useAccountItems(address)

  return (
    <button disabled={items.status !== IDLE} onClick={items.mint}>
      Send
    </button>
  )
}

export function Page() {

  const history = useHistory();
  const [user] = useCurrentUser()

  // if (user.addr == null) return <Redirect to={"/"} />

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  return (
    <div>
      <h1>Publish a NFT</h1>
      <form>
        <div className="grid-container">
          <label htmlFor="txtName">Name</label> <input name="txtName" id="txtName" />
          <label htmlFor="txtAddress">Address</label> <input name="txtAddress" />
          <label>Image URL</label> <input name="txtName" />
          <label>Color</label> <input name="txtName" />
          <label>Info</label> <input name="txtName" />
          <label>Quantity</label> <input name="txtName" />
          <label>Series</label> <input name="txtName" />
          <Suspense fallback={null}>
            <MintButton address={user.addr} />
          </Suspense>
        </div>
      </form>
    </div>
  )
}
