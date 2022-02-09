import { Suspense } from "react";
import { useCurrentUser } from "../../hooks/use-current-user.hook";
import * as Init from "../../flow/tx.initialize-my-account";

export function Page() {
  const [user, loggedIn] = useCurrentUser();

  const handleInitCollection = (e) => {
    Init.initCreateCollection(user.addr);
  }

  const handleDeleteCollection = (e) => {
    Init.initDeleteCollection(user.addr);
  }

  return (
    <div>
      {loggedIn ? (
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