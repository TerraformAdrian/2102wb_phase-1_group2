import { useEffect, useState } from "react";

export function useSetAllList() {
  // const [items, setItems] = useState({});
  const items = useState({});

  useEffect(() => {
    return;
    // const sets = await getSetAllList()

    // console.log(sets);

    // for (const prop in sets)
    //   console.log(sets[prop]);

    // setItems(sets);
  }, []);

  return {
    sets: items
  }
}