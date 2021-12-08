import { useEffect, useState } from "react";
import axios from "axios";

import { getSeriesList } from "../flow/sc.get-series-list";

export function useSeriesList(isDirty) {
  const [items, setItems] = useState({});

  console.log("2. Use Series List");
  console.log(isDirty);

  useEffect(async () => {
    if (isDirty != true)
      return;

    const series = await getSeriesList();

    console.log(series);

    for (const prop in series)
      console.log(series[prop]);

    setItems(series);
  });

  return {
    series: items
  }
}