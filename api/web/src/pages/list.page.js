
import { useState } from "react"
import { useHistory } from "react-router-dom"
import AccountItemsCluster from '../comps/account-items'

import './list.css'

export function Page() {
  const [state, setState] = useState({
    txtAddress: ""
  })
  const [address, setAddress] = useState("");
  const [count, setCount] = useState(0);
  const history = useHistory();

  // if (user.addr == null) return <Redirect to={"/"} />

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    })
  }

  const handleList = (e) => {

    if (state.txtAddress.length !== 18) {
      alert("Enter Address Corretly!");
      return;
    }

    setAddress(state.txtAddress);
    setCount(1 - count);
  }

  const handleMint = (e) => {
    e.preventDefault();
    history.push("/publish");
  }

  const handleMarket = (e) => {
    e.preventDefault();
    history.push("/market");
  }

  return (
    <div>
      <h1>NFT Listings</h1>
      <div>
        <label>Address: </label>
        <input name="txtAddress" id="txtAddress" onChange={handleChange} />&nbsp;
        <button onClick={handleList}>List NFTs</button>
        &nbsp;<button onClick={handleMint}>Mint an NFT</button>
        &nbsp;<button onClick={handleMarket}>View Marketplace</button>
        {
          address !== "" && <AccountItemsCluster address={address} />
        }
      </div>
    </div>
  )
}
