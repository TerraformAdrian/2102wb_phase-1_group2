import { useEffect, useState } from "react";
import { getEditionList } from "../flow/sc.get-edition-list";

export function useEditionList(series, bReload) {
  const [items, setItems] = useState({});

  useEffect(() => {
    async function fetchData() {
      if (series === "") {
        setItems({});
        return;
      }

      const editions = await getEditionList(series);

      setItems(editions);
    }
    fetchData()
  }, [series]);

  return {
    editions: items
  }
}