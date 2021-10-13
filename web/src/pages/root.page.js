
import {useCurrentUser} from "../hooks/use-current-user.hook"
import {Redirect} from "react-router-dom"

export function Page() {
  const [user, loggedIn, {signUp, logIn}] = useCurrentUser()

  if (loggedIn) return <Redirect to={"/publish"} />

  return (
    <div>
      <button onClick={logIn}>
        Log In
      </button>
      <button onClick={signUp}>
        Sign up
      </button>
    </div>
  )
}
