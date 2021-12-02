import { useState, Suspense } from "react";
import { useParams } from "react-router";
import { useAccountItem } from "../../hooks/use-account-item.hook";
import { useAccountItems } from "../../hooks/use-account-items.hook";
import { useEditionList } from "../../hooks/use-edition-list.hook";
import { useSeriesItem } from "../../hooks/use-series-item.hook";
import { useSetList } from "../../hooks/use-set-list.hook";

export function Item({meta}) {

  return (
    <div className="f3-store-series-item">
      <img src={meta.image} width="274px" height="172px" />
      <a href={"/editions/" + meta.id}>{meta.name} Edition</a>
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

  const { id } = useParams();
  const { series } = useSeriesItem(id);
  // const { editions } = useEditionList(id);/
  const { sets } = useSetList(id);

  const getList = () => {
    var res = [];
    
    for (const prop in sets) {
      res.push(<WrappedItem meta={sets[prop]} />)
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
          <h2 className="f3-store-h2">{series.name} Series - Current Editions</h2>
        </div>
        <div className="f3-store-container">
          { getList() }
        </div>
      </div>
    </div>
  )
}