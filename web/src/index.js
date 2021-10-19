import React, { Suspense } from 'react'
import ReactDOM from 'react-dom'
import {RecoilRoot} from "recoil"
import reportWebVitals from './reportWebVitals'
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"

import {Page as Root} from "./pages/root.page"
import {Page as Publish} from "./pages/publish.page"
import {Page as List} from "./pages/list.page"
import {Page as NotFound} from "./pages/not-found.page"

import * as fcl from "@onflow/fcl"
import * as t from "@onflow/types"

window.fcl = fcl
window.t = t

fcl
  .config()
  .put("accessNode.api", "http://localhost:8080")
  .put("discovery.wallet", "https://fcl-discovery.onflow.org/testnet/authn");

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