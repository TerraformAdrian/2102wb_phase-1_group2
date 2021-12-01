import { useEffect, useState } from "react";
import axios from "axios";

import { getSetList } from "../flow/sc.get-set-list";

export function useSetList(series) {
  const [items, setItems] = useState({});

  useEffect(async () => {
    const sets = await getSetList(series)

    console.log(sets);

    for (const prop in sets)
      console.log(sets[prop]);

    setItems(sets);
  }, []);

  return {
    sets: items
  }
}