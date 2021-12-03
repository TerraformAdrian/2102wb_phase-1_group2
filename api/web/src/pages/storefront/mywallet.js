import { Suspense } from "react";
import { useAccountItem } from "../../hooks/use-account-item.hook";
import { useAccountItems } from "../../hooks/use-account-items.hook";
import { useCurrentUser } from "../../hooks/use-current-user.hook";

export function Item({addr, id}) {
  const item = useAccountItem(addr, id);

  console.log(item);

  return (
      item.item && 
        <div>
          <p>{item.set.metadata["name"]}</p>
          <img src={item.set.metadata["thumb_image"]} />
          <p>{item.edition.name} Edition</p>
          <p>#{item.item.serialID} / {item.set.quantity}</p>
        </div>
  )
}

export function Page() {
  const [user, loggedIn, {signUp, logIn}] = useCurrentUser();
  const { ids } = useAccountItems(user.addr)

  console.log(ids);

  const handleLogin = (e) => {
    logIn();
  }

  return (
    <div className="f3-store-padding">
      <div>
        <h1 style={{margin: "10px 0px"}}>NFT Storefront</h1>
        <div className="f3-store-hline"></div>
      </div>
      <div className="f3-store-padding">
        <div>
          <h2 className="f3-store-h2">My Wallet NFTs</h2>
        </div>
        <div className="f3-mywallet-container">
          <div>
            {
              ids.map(item => (
                <Item addr={user.addr} id={item} />
              ))
            }
          </div>
        </div>

        { !loggedIn &&
          <button onClick={handleLogin}>Log In</button>
        }
      </div>
    </div>
  )
}

export function WrappedPage(props) {
  return (
    <Suspense fallback={null}>
      <Page {...props} />
    </Suspense>
  )
}