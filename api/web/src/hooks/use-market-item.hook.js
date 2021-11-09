import { useEffect, useState } from "react";
import { getMarketItem } from "../flow/sc.get-market-item";
import { buyMarketItem } from "../flow/tx.buy-market-item"

export function useMarketItem(address, id) {
  const [item, setItem] = useState({});

  console.log(item.price);

  useEffect(() => {
      getMarketItem(address, id).then(setItem);
  }, [address, id]);

  return {
    ...item,
    async buy() {
      await buyMarketItem(
        {itemID: id, ownerAddress: address},
        {
          onStart() {
          },
          async onSuccess() {
          },
          async onComplete() {
          },
          async onError(error) {
          },
        }
      )
    },
  }
}