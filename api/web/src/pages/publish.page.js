
import {IDLE} from "../global/constants"
import {useCurrentUser} from "../hooks/use-current-user.hook"
import {useAccountItems} from "../hooks/use-account-items.hook"
import { useInitialized } from "../hooks/use-initialized.hook"
import {Suspense, useState} from "react"
import {Redirect, useHistory} from "react-router-dom"

import './publish.css'

export function Page() {
  const [state, setState] = useState({
    txtAddress: "",
    txtName: "",
    txtImageURL: "", 
    txtColor: "",
    txtInfo: "",
    txtQuantity: ""
  })
  const history = useHistory();
  const [user] = useCurrentUser()

  // if (user.addr == null) return <Redirect to={"/"} />
  const items = useAccountItems(user.addr)
  const init = useInitialized(null)

  const handleInit = (e) => {
    e.preventDefault();
    init.initialize(state.txtAddress);
  }

  const handleChange = (e) => {
    setState({
      ...state, 
      [e.target.name]: e.target.value
    })
  }

  const handleView = (e) => {
    e.preventDefault();
    history.push("/list");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (state.txtAddress.length != 18) {
      alert("Enter Address Corretly!");
      return;
    }

    if (!await init.isSpecificInitialized(state.txtAddress)) {
      alert("Initialize account first!");
      return;
    }

    items.mint(
      state.txtAddress, 
      state.txtName, 
      state.txtImageURL, 
      state.txtColor, 
      state.txtInfo, 
      state.txtQuantity
      )

      console.log(items.ids.length);
  }

  const handleMarket = (e) => {
    e.preventDefault();
    history.push("/market");
  }

  return (
    <div className="grid-center">
      <h1>{user.addr}</h1>
      <h1>Publish a NFT</h1>
      <form>
        <div className="grid-container">
          <label htmlFor="txtName">Name</label> 
          <input name="txtName" id="txtName" onChange={handleChange} />
          <label htmlFor="txtAddress">Address</label> 
          <input name="txtAddress" id="txtAddress" onChange={handleChange} />
          <label>Image URL</label> 
          <input name="txtImageURL" id="txtImageURL" onChange={handleChange} />
          <label>Color</label> 
          <input name="txtColor" id="txtColor" onChange={handleChange} />
          <label>Info</label> 
          <input name="txtInfo" id="txtInfo" onChange={handleChange} />
          {1 == 0 && <><label>Quantity</label> 
          <input name="txtQuantity" id="txtQuantity" onChange={handleChange} />
          </>}
          <label>Series</label> 
          <input name="txtSeries" id="txtSeries" onChange={handleChange} />
          <button disabled={user.addr !== state.txtAddress} onClick={handleInit}>
            Initialize
          </button>
          <button disabled={items.status !== IDLE} onClick={handleSubmit}>
            Send
          </button>
          <button onClick={handleView}>View List</button>
          <button onClick={handleMarket}>View Marketplace</button>
        </div>
      </form>
    </div>
  )
}
