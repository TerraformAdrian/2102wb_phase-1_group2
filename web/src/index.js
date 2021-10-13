import React from 'react'
import ReactDOM from 'react-dom'
import {RecoilRoot} from "recoil"
import reportWebVitals from './reportWebVitals'
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"

import {Page as Root} from "./pages/root.page"
import {Page as Account} from "./pages/account"
import {Page as NotFound} from "./pages/not-found.page"

import * as fcl from "@onflow/fcl"
import * as t from "@onflow/types"

window.fcl = fcl
window.t = t

fcl
  .config()
  .put("accessNode.api", "https://access-testnet.onflow.org")
  .put("discovery.wallet", "https://fcl-discovery.onflow.org/testnet/authn");

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <Router>
        <Switch>
          <Route exact path="/publish">
            <Account />
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