import { useState, Suspense } from "react";
import { useAccountItem } from "../../hooks/use-account-item.hook";
import { useAccountItems } from "../../hooks/use-account-items.hook";

export function Item({address, id}) {
  const item = useAccountItem(address, id)

  console.log(item);

  return (
    <div className="f3-store-series-item">
      <img src={item.tokenURI} width="274px" height="172px" />
      <a href={"/zeb-nolan/" + item.itemID}>{item.editionName}</a>
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
  const items = useAccountItems("0xab5876435fbf2063")

  return (
    <div className="f3-store-padding">
      <div>
        <h1 style={{margin: "10px 0px"}}>NFT Storefront</h1>
        <div className="f3-store-hline"></div>
      </div>
      <div className="f3-store-padding">
        <div>
          <h2 className="f3-store-h2">Zeb Nolan Interview Collection - Current Series</h2>
        </div>
        <div className="f3-store-container">
          {
            items.ids.map((item, index) => (
              <WrappedItem address="0xab5876435fbf2063" id={item} />
            ))
          }
        </div>
      </div>
    </div>
  )
}