import { useEffect, useState } from "react";
import { getSeriesList } from "../flow/sc.get-series-list";

export function useSeriesList(isDirty) {
  const [items, setItems] = useState({});
  const [state, setState] = useState(true);

  useEffect(() => {
    async function fetchData() {
      if (state !== true && isDirty !== true)
        return;

      const series = await getSeriesList();

      setState(false);
      setItems(series);
    }
    fetchData()
  }, [state, isDirty]);

  return {
    series: items
  }
}