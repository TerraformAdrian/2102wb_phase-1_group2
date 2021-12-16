import { useEffect, useState } from "react";
import axios from "axios";

import { getSeriesList } from "../flow/sc.get-series-list";

export function useSeriesList(isDirty) {
  const [items, setItems] = useState({});
  const [state, setState] = useState(true);

  console.log("2. Use Series List");
  console.log(isDirty);

  useEffect(async () => {
    if (state != true && isDirty != true)
      return;

    const series = await getSeriesList();

    console.log(series);

    for (const prop in series)
      console.log(series[prop]);

    setState(false);
    setItems(series);
  }, [state, isDirty]);

  return {
    series: items
  }
}