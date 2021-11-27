import React, {useEffect, useState, Suspense} from "react"
import {useAccountItem} from "../hooks/use-account-item.hook"
import {useCurrentUser} from "../hooks/use-current-user.hook"
import {IDLE} from "../global/constants"

export function AccountItemCluster({address, id}) {
  const item = useAccountItem(address, id)

  const BUSY = item.status !== IDLE

  if (address == null) return null
  if (id == null) return null

  return (
    <div className="grid-list">
      <h3>Handy#{item.itemID}</h3>

      <p>{item.name}</p>
      <p>{item.tokenURI}</p>
      <p>{item.color}</p>
      <p>{item.info}</p>
      <button 
        onClick={() => item.sell("5.0")}
      >
        Sell
      </button>
    </div>
  )
}

export default function WrappedAccountItemCluster(props) {
  return (
    <Suspense fallback={null}>
      <AccountItemCluster {...props} />
    </Suspense>
  )
}
