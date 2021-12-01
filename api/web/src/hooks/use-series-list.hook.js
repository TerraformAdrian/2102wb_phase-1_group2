import { useEffect, useState } from "react";
import axios from "axios";

import { getSeriesList } from "../flow/sc.get-series-list";

export function useSeriesList() {
  const [items, setItems] = useState({});

  useEffect(async () => {
    const series = await getSeriesList();

    console.log(series);

    for (const prop in series)
      console.log(series[prop]);

    setItems(series);
  }, []);

  return {
    series: items
  }
}