import React, { Suspense } from 'react'
import ReactDOM from 'react-dom'
import {RecoilRoot} from "recoil"
import reportWebVitals from './reportWebVitals'
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"

import {Page as Root} from "./pages/root.page"
import {Page as Publish} from "./pages/publish.page"
import {Page as List} from "./pages/list.page"
import {Page as Market} from "./pages/market.page"
import {Page as NotFound} from "./pages/not-found.page"

import * as fcl from "@onflow/fcl"
import * as t from "@onflow/types"

window.fcl = fcl
window.t = t

fcl
  .config()
  .put("faucet", process.env.REACT_APP_FAUCET_ADDRESS)
  .put("accessNode.api", process.env.REACT_APP_FLOW_ACCESS_API_URL)
  .put("challenge.handshake", process.env.REACT_APP_WALLET_DISCOVERY)
  .put("0xFungibleToken", process.env.REACT_APP_CONTRACT_FUNGIBLE_TOKEN)
  .put("0xNonFungibleToken", process.env.REACT_APP_CONTRACT_NON_FUNGIBLE_TOKEN)
  .put("0xNFTStorefront", process.env.REACT_APP_CONTRACT_NFT_STOREFRONT)
  .put("0xHandyItems", process.env.REACT_APP_CONTRACT_HANDY_ITEMS)
  .put("decoder.Type", val => val.staticType)

  console.log(process.env)

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <Router>
        <Switch>
          <Route exact path="/publish">
            <Suspense fallback={null}>
              <Publish />
            </Suspense>
          </Route>
          <Route exact path="/list">
            <List />
          </Route>
          <Route exact path="/market">
            <Market />
          </Route>
          <Route exact path="/">
            <Root />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </Router>
    </RecoilRoot>
  </React.StrictMode>
  ,
  document.getElementById("root")
)

reportWebVitals()