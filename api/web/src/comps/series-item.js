import {Suspense} from "react"
import { useEditionList } from "../hooks/use-edition-list.hook"

export function EditionItemsCluster({series}) {
  const { editions } = useEditionList(series)

  const getList = () => {
    var txt = "";
    var prop;

    for (prop in editions) {
      txt += editions[prop];
    }

    return txt;
  }

  return (
    <div>
      { getList() }
    </div>
  )
}

export default function WrappedEditionItemsCluster() {
  return (
    <Suspense fallback={null}>
      <EditionItemsCluster />
    </Suspense>
  )
}
