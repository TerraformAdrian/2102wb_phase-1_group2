import { useEffect, useState } from "react";
import axios from "axios";

import { getEditionList } from "../flow/sc.get-edition-list";

export function useEditionList() {
  const [items, setItems] = useState({});

  useEffect(async () => {
    const editions = await getEditionList();

    console.log(editions);

    for (const prop in editions)
      console.log(editions[prop].name);

    setItems(editions);
  }, []);

  return {
    editions: items
  }
}