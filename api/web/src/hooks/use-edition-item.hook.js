import { useEffect, useState } from "react";
import { getEditionItem } from "../flow/sc.get-edition-item";

export function useEditionItem(id) {
  const [item, setItem] = useState({});

  useEffect(() => {
    async function fetchData() {
      const edition = await getEditionItem(id);

      console.log(edition);

      for (const prop in edition)
        console.log(edition[prop]);

      setItem(edition);
    }
    fetchData()
  }, [id]);

  return {
    edition: item
  }
}