import { Suspense } from "react";
import { useAccountItem } from "../../hooks/use-account-item.hook";
import { useAccountItems } from "../../hooks/use-account-items.hook";
import { useCurrentUser } from "../../hooks/use-current-user.hook";
import { Page as Navbar} from "../navbar"

export function Item({addr, id}) {
  const item = useAccountItem(addr, id);

  console.log(item);

  return (
      item.item ? (
        <div className="f3-mywallet-container">
          <div className="f3-center">
            <div>{item.set.metadata["name"]}</div>
            <img src={item.set.metadata["thumb_image"]} />
            <div>{item.edition.name} Edition</div>
            <div>#{item.item.serialID} / {item.set.quantity}</div>
          </div>
          <div>
            {/*src={process.env.REACT_APP_API_URL + "/video/" + item.edition.name + ".mp4"}*/}
            {/*"http://nft.ikonicc.ca" + "/video/" + item.edition.name + ".mp4"*/}
            <video
              width="auto"
              height="150px"
              src={process.env.REACT_APP_API_URL + "/video/" + item.edition.name + ".mp4"}
              controls="controls"
            />
          </div>
        </div>
      ) : (
        <div></div>
      )
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
        <div>
          { ids.map(item => <Item addr={user.addr} id={item} />) }
        </div>
      </div>
    </div>
  )
}

export function WrappedPage(props) {
  return (
    <Suspense fallback={null}>
      <Navbar />
      <Page {...props} />
    </Suspense>
  )
}