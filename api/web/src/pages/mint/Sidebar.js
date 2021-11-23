
import {IDLE} from "../global/constants"
import {useCurrentUser} from "../hooks/use-current-user.hook"
import {useAccountItems} from "../hooks/use-account-items.hook"
import {Suspense, useState} from "react"
import {Redirect, useHistory} from "react-router-dom"
import AccountItemsCluster from '../comps/account-items'

export function Page() {
  const [state, setState] = useState({
    txtAddress: ""
  })
  const [address, setAddress] = useState("");
  const [count, setCount] = useState(0);
  const history = useHistory();
  const [user] = useCurrentUser()

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    })
  }

  const handleList = (e) => {

    if (state.txtAddress.length != 18) {
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
      
    </div>
  )
}
