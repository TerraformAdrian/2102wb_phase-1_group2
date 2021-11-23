
import {IDLE} from "../../global/constants"
import {useCurrentUser} from "../../hooks/use-current-user.hook"
import {useAccountItems} from "../../hooks/use-account-items.hook"
import {Suspense, useState} from "react"
import {Redirect, useHistory} from "react-router-dom"
import AccountItemsCluster from '../../comps/account-items'

import { SideBar } from "./sidebar"

import "./index.css"

export function Assets() {

  return (
    <div>
      <h2>::Assetsss</h2>
      <label>Name </label>
      <input id="inName" name="inName" />
      <p></p>
      <label>Browse for file: </label>
      <input type="file" id="inFile" name="inFile" />
    </div>
  )

}

export function Page() {
  return (
    <div>
      <SideBar />
      <div className="f3-main">
        <Assets />
      </div>
    </div>
  )
}
