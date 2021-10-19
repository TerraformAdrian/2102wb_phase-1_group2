
import {IDLE} from "../global/constants"
import {useCurrentUser} from "../hooks/use-current-user.hook"
import {useAccountItems} from "../hooks/use-account-items.hook"
import {Suspense} from "react"
import {Redirect, useHistory} from "react-router-dom"

import './publish.css'

export function Page() {

  // const history = useHistory();
  const [user] = useCurrentUser()

  // if (user.addr == null) return <Redirect to={"/"} />
  const items = useAccountItems(user.addr)

  console.log(user);

  const handleInit = (e) => {
    e.preventDefault();

  }

  const handleSubmit = (e) => {
    e.preventDefault();

    items.mint(
      document.getElementById("txtAddress").value, 
      document.getElementById("txtName").value, 
      document.getElementById("txtImageURL").value, 
      document.getElementById("txtColor").value, 
      document.getElementById("txtInfo").value, 
      document.getElementById("txtQuantity").value
      )

      console.log(items.ids.length);
  }

  return (
    <div>
      <h1>{user.addr}</h1>
      <h1>Publish a NFT</h1>
      <form>
        <div className="grid-container">
          <label htmlFor="txtName">Name</label> <input name="txtName" id="txtName" />
          <label htmlFor="txtAddress">Address</label> <input name="txtAddress" id="txtAddress" />
          <label>Image URL</label> <input name="txtImageURL" id="txtImageURL" />
          <label>Color</label> <input name="txtColor" id="txtColor" />
          <label>Info</label> <input name="txtInfo" id="txtInfo" />
          <label>Quantity</label> <input name="txtQuantity" id="txtQuantity" />
          <label>Series</label> <input name="txtSeries" id="txtSeries" />
            <button disabled={items.status !== IDLE} onClick={handleSubmit}>
              Send
            </button>
            <button onClick={handleInit}>
              Setup Account
            </button>
        </div>
      </form>
    </div>
  )
}
