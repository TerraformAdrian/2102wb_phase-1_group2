import { useEffect, useState } from "react";
import axios from "axios";

export function useIpfsItems() {
  const [items, setItems] = useState([]);

  useEffect(async () => {
    const assetList = await axios.get(process.env.REACT_APP_API_URL + "/v1/assets/list");
    if (assetList.data.success != "true") return;

    setItems(assetList.data.result);
  }, []);

  return {
    assets: items
  }
}