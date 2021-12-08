import { useEffect, useState } from "react";
import axios from "axios";

import { getEditionList } from "../flow/sc.get-edition-list";

export function useEditionList(series, bReload) {
  const [items, setItems] = useState({});

  useEffect(async () => {
    if (series === "") {
      console.log("Empty");
      setItems({});
      return;
    }

    const editions = await getEditionList(series);

    console.log(editions);

    for (const prop in editions)
      console.log(editions[prop]);

    setItems(editions);
  }, [series]);

  return {
    editions: items
  }
}