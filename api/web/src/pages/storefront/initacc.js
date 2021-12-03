import { Suspense } from "react";
import { useParams } from "react-router";
import { useAccountItem } from "../../hooks/use-account-item.hook";
import { useSetItem } from "../../hooks/use-set-item.hook";
import { useSeriesItem } from "../../hooks/use-series-item.hook";
import { useEditionItem } from "../../hooks/use-edition-item.hook";
import { purchaseHandyItem } from "../../flow/tx.purchase-handy-item";
import { useCurrentUser } from "../../hooks/use-current-user.hook";
import * as Init from "../../flow/tx.initialize-my-account";

export function Page() {
  const [user, loggedIn, {signUp, logIn}] = useCurrentUser();

  const handlePurchase = (e) => {
    e.preventDefault();

    if (!loggedIn) {
      console.log("You must log in.");
      return;
    }
  }

  const handleLogin = (e) => {
    logIn();
  }

  const handleInitCollection = (e) => {
    Init.initCreateCollection(user.addr);
  }

  const handleDeleteCollection = (e) => {
    Init.initDeleteCollection(user.addr);
  }

  return (
    <div>
      { loggedIn ? (
        <div>
          <button onClick={handleDeleteCollection}>Delete Collection</button>
          <button onClick={handleInitCollection}>Init Collection</button>
        </div>
      ) : (
        <div></div>
      )}
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