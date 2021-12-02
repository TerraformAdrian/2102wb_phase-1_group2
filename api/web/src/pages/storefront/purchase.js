import { Suspense } from "react";
import { useParams } from "react-router";
import { useAccountItem } from "../../hooks/use-account-item.hook";
import { useSetItem } from "../../hooks/use-set-item.hook";
import { useSeriesItem } from "../../hooks/use-series-item.hook";
import { useEditionItem } from "../../hooks/use-edition-item.hook";
import { purchaseHandyItem } from "../../flow/tx.purchase-handy-item";
import { useCurrentUser } from "../../hooks/use-current-user.hook";

export function Page() {
  let { id } = useParams();
  const { item } = useSetItem(id);

  const [user, loggedIn, {signUp, logIn}] = useCurrentUser();

  const { series } = useSeriesItem(Object.keys(item).length != 0 ? item.seriesID : "");
  const { edition } = useEditionItem(Object.keys(item).length != 0 ? item.editionID : "");

  const handlePurchase = (e) => {
    e.preventDefault();

    if (!loggedIn) {
      console.log("You must log in.");
      return;
    }

    purchaseHandyItem({setID: id, ownerAddress: process.env.REACT_APP_CONTRACT_HANDY_ITEMS}, {
      onStart() {
      },
      async onSuccess() {
      },
      async onComplete() {
      },
      async onError(error) {
      }
    })
  }

  const handleLogin = (e) => {
    logIn();
  }

  return (Object.keys(item).length != 0) ? (
    <div className="f3-store-padding">
      <div>
        <h1 style={{margin: "10px 0px"}}>NFT Storefront</h1>
        <div className="f3-store-hline"></div>
      </div>
      <div className="f3-store-padding">
        <div>
          <h2 className="f3-store-h2">SportsCast - {series.name} {edition.name} Edition</h2>
        </div>
        <div>
          <img src={item.metadata["thumb_image"]} />
          <p>Description: {item.metadata["description"]}</p>
          <p>Player: {item.metadata["name"]}</p>
          <p>Edition: {edition.name}</p>
          <p>Available: {item.quantity}</p>
          <p>Price: ${item.price}</p>
        </div>
        <button onClick={handlePurchase}>Purchase</button>
        { !loggedIn &&
          <button onClick={handleLogin}>Log In</button>
        }
      </div>
    </div>
  ) : (
    <div></div>
  )
}

export function WrappedPage(props) {
  return (
    <Suspense fallback={null}>
      <Page {...props} />
    </Suspense>
  )
}