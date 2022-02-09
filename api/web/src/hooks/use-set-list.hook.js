import { useEffect, useState } from "react";
import { getSetList } from "../flow/sc.get-set-list";

export function useSetList(series) {
  const [items, setItems] = useState({});

  useEffect(() => {
    async function fetchData() {
      const sets = await getSetList(series)

      for (const prop in sets)
        console.log(sets[prop]);

      setItems(sets);
    }
    fetchData()
  }, [series]);

  return {
    sets: items
  }
}