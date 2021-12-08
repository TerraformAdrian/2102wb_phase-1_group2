import { useEffect, useState } from "react";
import axios from "axios";

import { getSetAllList } from "../flow/sc.get-set-all";

export function useSetAllList() {
  const [items, setItems] = useState({});
  // const [items, setItems] = useState({});

  useEffect(async () => {
    return;
    const sets = await getSetAllList()

    console.log(sets);

    for (const prop in sets)
      console.log(sets[prop]);

    setItems(sets);
  }, []);

  return {
    sets: items
  }
}