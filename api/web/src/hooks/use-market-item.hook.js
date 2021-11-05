import { useEffect, useState } from "react";
import { getMarketItem } from "../flow/sc.get-market-item";

export function useMarketItem(address, id) {
  const [item, setItem] = useState({});

  useEffect(() => {
      getMarketItem(address, id).then(setItem);
  }, []);

  return {
    ...item
  }
}