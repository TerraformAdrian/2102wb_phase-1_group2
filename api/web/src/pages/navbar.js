
import { useCurrentUser } from "../hooks/use-current-user.hook";
import "./mint/index.css"

export function Page() {
  const [user, loggedIn, {signUp, logIn, logOut}] = useCurrentUser();

  const handleConnectWallet = (e) => {
    e.preventDefault();

    logIn();
  }

  const handleLogout = (e) => {
    e.preventDefault();

    logOut();
  }

  return (
    <div class="navbar">
      <ul>
        <li><a href="/">NFT Storefront</a></li>
        <li><a href="/mywallet">My Wallet</a></li>
        <li style={{float: "right"}}>
          { 
            loggedIn ? (
              <div>
                <span className="f3-nav-addr">{user.addr}</span>
                <a href="#" onClick={handleLogout}>Sign out</a>
              </div>
            ) : (
              <a href="#" onClick={handleConnectWallet}>Connect Wallet</a>
            )
          }
        </li>
      </ul>
    </div>
  )
}