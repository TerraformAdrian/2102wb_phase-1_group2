import { useEffect } from "react";
import { atom, useRecoilState } from "recoil"
import { getMarketItems } from "../flow/sc.get-market-items";
import { IDLE } from "../global/constants"

export const $marketItemsState = atom({
  key: "market-items::state",
  default: [],
})

export const $marketItemsStatus = atom({
  key: "market-items::status",
  default: IDLE,
})

export function useMarketItems(address) {
  const [items, setItems] = useRecoilState($marketItemsState);
  const status = useRecoilState($marketItemsStatus);
  // const [status, setStatus] = useRecoilState($marketItemsStatus);

  useEffect(() => {
    getMarketItems(address).then(setItems);
  }, [address, setItems]);

  return {
    items,
    status,
    refresh() {
      getMarketItems(address).then(setItems);
    }
  }
}