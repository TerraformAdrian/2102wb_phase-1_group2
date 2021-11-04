
import {useCurrentUser} from "../hooks/use-current-user.hook"
import {Redirect, useHistory} from "react-router-dom"

export function Page() {
  const [user, loggedIn, {signUp, logIn}] = useCurrentUser()
  const history = useHistory();

  if (loggedIn) return <Redirect to={"/publish"} />

  const handleMint = (e) => {
    e.preventDefault();
    history.push("/publish");
  }

  return (
    <div>
      <button onClick={logIn}>
        Log In
      </button>&nbsp;
      <button onClick={signUp}>
        Sign up
      </button>&nbsp;
      <button onClick={handleMint}>Mint an NFT</button>
    </div>
  )
}
