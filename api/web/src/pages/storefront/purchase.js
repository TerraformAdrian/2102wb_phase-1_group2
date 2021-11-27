import { Suspense } from "react";
import { useParams } from "react-router";
import { useAccountItem } from "../../hooks/use-account-item.hook";

export function Page() {
  let { id } = useParams();
  const item = useAccountItem("0xab5876435fbf2063", id)

  console.log(item);

  return (
    <div className="f3-store-padding">
      <div>
        <h1 style={{margin: "10px 0px"}}>NFT Storefront</h1>
        <div className="f3-store-hline"></div>
      </div>
      <div className="f3-store-padding">
        <div>
          <h2 className="f3-store-h2">Zeb Nolan Interview Collection - {item.editionName} Series</h2>
        </div>
        <div>
          <img src={item.tokenURI} />
          <p>Player: {item.name}</p>
          <p>Series: {item.editionName}</p>
          <p>Available: {item.quantity}</p>
          <p>Price: ${item.price}</p>
        </div>
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