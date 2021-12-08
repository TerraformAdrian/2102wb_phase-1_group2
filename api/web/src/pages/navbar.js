
import { useCurrentUser } from "../hooks/use-current-user.hook";
import { useInitialized } from "../hooks/use-initialized.hook";
import "./mint/index.css"

export function Page() {
  const [user, loggedIn, {signUp, logIn, logOut}] = useCurrentUser();
  const init = useInitialized(user.addr)

  console.log(init);

  const handleConnectWallet = (e) => {
    e.preventDefault();

    logIn();
  }

  const handleInitializeWallet = (e) => {
    e.preventDefault();

    init.initialize(user.addr);
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
                {
                  init.isInitialized == true ? (
                    <span className="f3-nav-addr">{user.addr}</span>
                  ): (
                    <a href="#" onClick={handleInitializeWallet}>Initialize Wallet</a>
                  )
                }
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