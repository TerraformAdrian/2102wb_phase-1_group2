
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

  const handleDeposit = (e) => {
    e.preventDefault();
    // live :"https://buy.moonpay.com/?apiKey=pk_live_R5Lf25uBfNZyKwccAZpzcxuL3ZdJ3Hc&defaultCurrencyCode=flow&showOnlyCurrencies=flow%2Cfusd"
    // test :"https://buy-sandbox.moonpay.com/?apiKey=pk_live_R5Lf25uBfNZyKwccAZpzcxuL3ZdJ3Hc&defaultCurrencyCode=flow&showOnlyCurrencies=flow%2Cfusd"
    window.open("https://buy-sandbox.moonpay.com/?apiKey=pk_test_HujosrJl5vx5M0M043cTD0qfgioJobiM&defaultCurrencyCode=flow&showOnlyCurrencies=flow%2Cfusd", "deposit", "width=600,height=400");
    // window.open("https://buy-sandbox.moonpay.com?apiKey=pk_test_HujosrJl5vx5M0M043cTD0qfgioJobiM", "deposit", "width=600,height=400");
  }

  let btnDeposit;
  if (loggedIn && init.isInitialized) {
    btnDeposit = <li><a href="/deposit"  onClick={handleDeposit}>Deposit</a></li>;
  }

  return (
    <div class="navbar">
      <ul>
        <li><a href="/">NFT Storefront</a></li>
        <li><a href="/mywallet">My Wallet</a></li>
        {btnDeposit}
        {/* <li><a href="/deposit"  onClick={handleDeposit}>Deposit</a></li> */}
        
        <li style={{float: "right"}}>
          { 
            loggedIn ? (
              <div>
                {
                  init.isInitialized == true ? (
                    <span className="f3-nav-addr">Account Connected:&nbsp; {user.addr}</span>
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