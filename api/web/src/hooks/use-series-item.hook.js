import { useEffect, useState } from "react";
import axios from "axios";

import { getSeriesItem } from "../flow/sc.get-series-item";

export function useSeriesItem(id) {
  const [item, setItem] = useState({});

  useEffect(async () => {
    const series = await getSeriesItem(id);

    console.log(series);

    for (const prop in series)
      console.log(series[prop]);

      setItem(series);
  }, []);

  return {
    item: item
  }
}