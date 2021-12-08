import { Suspense, useState } from "react";
import { useParams } from "react-router";
import { useAccountItem } from "../../hooks/use-account-item.hook";
import { useSetItem } from "../../hooks/use-set-item.hook";
import { useSeriesItem } from "../../hooks/use-series-item.hook";
import { useEditionItem } from "../../hooks/use-edition-item.hook";
import { purchaseHandyItem } from "../../flow/tx.purchase-handy-item";
import { useCurrentUser } from "../../hooks/use-current-user.hook";
import { useInitialized } from "../../hooks/use-initialized.hook";
import { Page as Navbar } from "../navbar"

import { toast } from 'react-toast'
import Loader from "react-loader-spinner";

export function Page() {
  let { id } = useParams();
  const { item, reload } = useSetItem(id);

  const [user, loggedIn, {signUp, logIn}] = useCurrentUser();

  const { series } = useSeriesItem(Object.keys(item).length != 0 ? item.seriesID : "");
  const { edition } = useEditionItem(Object.keys(item).length != 0 ? item.editionID : "");
  const init = useInitialized(user.addr);
  const [buyingState, setBuyingState] = useState(0);  // 0: Normal, 1: Buying, 2: Error

  const handlePurchase = (e) => {
    e.preventDefault();

    purchaseHandyItem({setID: id, ownerAddress: process.env.REACT_APP_CONTRACT_HANDY_ITEMS}, {
      onStart() {
        setBuyingState(1);
      },
      async onSuccess() {
        setBuyingState(0);
        toast.success("Successfully purchased!");
      },
      async onComplete() {
        reload();
      },
      async onError(error) {
        setBuyingState(2);
        toast.error("Unexpected error occured! \n" + error);
        console.log(error);
      }
    })
  }

  const handleLogin = (e) => {
    logIn();
  }

  const handleInitializeWallet = (e) => {
    e.preventDefault();

    init.initialize(user.addr);
  }

  return (Object.keys(item).length != 0) ? (
    <div>
      <Navbar />
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
          <img
            width="200px"
            height="250px"
            src={item.metadata["thumb_image"]}
          />
          <p>{item.metadata["description"]}</p>
          <p>Player: {item.metadata["name"]}</p>
          <p>Edition: {edition.name}</p>
          <p>Available: {item.quantity - item.numberMinted}</p>
          <p>Price: ${item.price}</p>
        </div>
        {
          loggedIn != true ? (
            <button onClick={handleLogin}>Connect Wallet</button>
          ) : (
            init.isInitialized == true ? (
              <button onClick={handlePurchase} disabled={buyingState == 1}>
                { buyingState == 1 && 
                    <Loader type="Oval" color="#1f1f1f" height={20} width={20} className="f3-inline" /> }
                Purchase
              </button>
            ) : (
              <button onClick={handleInitializeWallet}>Initialize Wallet</button>
            )
          )
        }
      </div>
    </div>
    </div>
  ) : (
    <div><Navbar /></div>
  )
}

export function WrappedPage(props) {
  return (
    <Suspense fallback={null}>
      <Page {...props} />
    </Suspense>
  )
}