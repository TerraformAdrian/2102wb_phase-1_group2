import { useEffect, useState } from "react";
import axios from "axios";

import { getSetItem } from "../flow/sc.get-set-item";

export function useSetItem(id) {
  const [item, setItem] = useState({});

  async function reload() {
    const set = await getSetItem(id)

    setItem(set);
  }

  useEffect(async () => {
    const set = await getSetItem(id)

    console.log(set);

    for (const prop in set)
      console.log(set[prop]);

    setItem(set);
  }, []);

  return {
    item: item,
    reload: reload
  }
}