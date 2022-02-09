import { Suspense } from "react";
import { useCurrentUser } from "../hooks/use-current-user.hook"
import { Redirect } from "react-router-dom"

export function Item() {
  return (
    <div className="f3-store-collection-item">
      <img alt="zeb.png" src="zeb.png" width="127px" height="127px" />
      <a href="/zeb-nolan">Zeb Nolan Interview</a>
    </div>
  )
}

export function WrappedItem(props) {
  return (
    <Suspense fallback={null}>
      <Item {...props} />
    </Suspense>
  )
}

export function Page() {
  const [loggedIn] = useCurrentUser()

  if (loggedIn) return <Redirect to={"/publish"} />

  return (
    <div className="f3-store-padding">
      <div>
        <h1 style={{ margin: "10px 0px" }}>NFT Storefront</h1>
        <div className="f3-store-hline"></div>
      </div>
      <div className="f3-store-padding">
        <div>
          <h2 className="f3-store-h2">Available Collections</h2>
        </div>
        <div className="f3-store-container">
          <Item />
        </div>
      </div>
    </div>
  )
}
