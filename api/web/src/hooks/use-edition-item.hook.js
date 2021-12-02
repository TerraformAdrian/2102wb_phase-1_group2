import { useEffect, useState } from "react";
import axios from "axios";

import { getEditionItem } from "../flow/sc.get-edition-item";

export function useEditionItem(id) {
  const [item, setItem] = useState({});

  useEffect(async () => {
    const edition = await getEditionItem(id);

    console.log(edition);

    for (const prop in edition)
      console.log(edition[prop]);

      setItem(edition);
  }, [id]);

  return {
    edition: item
  }
}