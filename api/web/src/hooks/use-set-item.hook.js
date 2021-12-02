import { useEffect, useState } from "react";
import axios from "axios";

import { getSetItem } from "../flow/sc.get-set-item";

export function useSetItem(id) {
  const [item, setItem] = useState({});

  useEffect(async () => {
    const set = await getSetItem(id)

    console.log(set);

    for (const prop in set)
      console.log(set[prop]);

    setItem(set);
  }, []);

  return {
    item: item
  }
}