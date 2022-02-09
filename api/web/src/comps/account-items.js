import {Suspense} from "react"
import {useAccountItems} from "../hooks/use-account-items.hook"
import Item from "./account-item"

export function AccountItemsCluster({address}) {
  const items = useAccountItems(address)

  if (address == null) return null

  if (items.ids.length <= 0)
    return (
      <p>No Items</p>
    )

  return (
    <div>
      <div className="grid-list">
        <h2>ID</h2>
        <h2>Name</h2>
        <h2>Image URL</h2>
        <h2>Color</h2>
        <h2>Info</h2>
      </div>
      {items.ids.map(id => (
        <Item key={id} id={id} address={address} />
      ))}
    </div>
  )
}

export default function WrappedAccountItemsCluster({address}) {
  return (
    <Suspense fallback={null}>
      <AccountItemsCluster address={address} />
    </Suspense>
  )
}
