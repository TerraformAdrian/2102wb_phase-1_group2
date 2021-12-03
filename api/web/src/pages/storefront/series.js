import { useState, Suspense } from "react";
import { MarketItemsCluster } from "../../comps/market-items";
import { useAccountItem } from "../../hooks/use-account-item.hook";
import { useAccountItems } from "../../hooks/use-account-items.hook";
import { useSeriesList } from "../../hooks/use-series-list.hook";

export function Item({meta}) {

  console.log(meta);

  return (
    <div className="f3-store-collection-item">
      <img src={meta.image} />
      <a href={"/series/" + meta.id}>{meta.name}</a>
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

  const { series } = useSeriesList();

  const getList = () => {
    var res = [];
    
    for (const prop in series) {
      res.push(<WrappedItem meta={series[prop]} />)
    }

    return res;
  }

  return (
    <div className="f3-store-padding">
      <div>
        <h1 style={{margin: "10px 0px"}}>NFT Storefront</h1>
        <div className="f3-store-hline"></div>
      </div>
      <div className="f3-store-padding">
        <div>
          <h2 className="f3-store-h2">Available Series</h2>
        </div>
        <div className="f3-store-container">
          { getList() }
        </div>
      </div>
    </div>
  )
}