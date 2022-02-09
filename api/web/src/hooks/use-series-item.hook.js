import { useEffect, useState } from "react";
import { getSeriesItem } from "../flow/sc.get-series-item";

export function useSeriesItem(id) {
  const [item, setItem] = useState({});

  useEffect(() => {
    async function fetchData() {
      const series = await getSeriesItem(id);

      setItem(series);
    }
    fetchData()
  }, [id]);

  return {
    series: item
  }
}