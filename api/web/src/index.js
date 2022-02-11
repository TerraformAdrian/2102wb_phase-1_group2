import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { RecoilRoot } from "recoil";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toast";

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import { Page as MintNFT2 } from "./pages/mint/mintnft2";

import { Page as Publish } from "./pages/publish.page";
import { Page as List } from "./pages/list.page";
import { Page as Market } from "./pages/market.page";
import { Page as Assets } from "./pages/mint/assets";
import { Page as MintNFT } from "./pages/mint/mintnft";
import { Page as Collections } from "./pages/mint/collections";
import { Page as Series } from "./pages/storefront/series";
import { Page as Edition } from "./pages/storefront/edition";
import { Page as InitAcc } from "./pages/storefront/initacc";
import { Page as Navbar } from "./pages/navbar";
import { Footer } from "./pages/common/footer";
import { MarketPlace } from "./pages/marketplace/marketplace";
import { Success } from "./pages/purchase/success";

import { NftCommingsoon } from "./pages/common/nftcs";
import { Partners } from "./pages/common/partner";

import { WrappedPage as Purchase } from "./pages/storefront/purchase";
import { WrappedPage as MyWallet } from "./pages/storefront/mywallet";
import { Page as NotFound } from "./pages/not-found.page";

import * as fcl from "@onflow/fcl";
import * as t from "@onflow/types";

window.fcl = fcl;
window.t = t;

fcl.config()
    .put("faucet", process.env.REACT_APP_FAUCET_ADDRESS)
    .put("accessNode.api", process.env.REACT_APP_FLOW_ACCESS_API_URL)
    .put("challenge.handshake", process.env.REACT_APP_WALLET_DISCOVERY)
    .put("0xFungibleToken", process.env.REACT_APP_CONTRACT_FUNGIBLE_TOKEN)
    .put(
        "0xNonFungibleToken",
        process.env.REACT_APP_CONTRACT_NON_FUNGIBLE_TOKEN
    )
    .put("0xNFTStorefront", process.env.REACT_APP_CONTRACT_NFT_STOREFRONT)
    .put("0xHandyItems", process.env.REACT_APP_CONTRACT_HANDY_ITEMS)
    .put("0xFlowToken", process.env.REACT_APP_CONTRACT_FLOW_TOKEN)
    .put("0xFUSD", process.env.REACT_APP_CONTRACT_FUSD_TOKEN)
    .put("decoder.Type", (val) => val.staticType);

ReactDOM.render(
    <React.StrictMode>
        <RecoilRoot>
            <Router>
                <Switch>
                    <Route exact path="/mintpanel/mintnft2">
                        <MintNFT2 />
                    </Route>

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
                    <Route exact path="/marketplace">
                        <Suspense fallback={null}>
                            <Navbar />
                            <MarketPlace />
                            <Partners />
                            <Footer />
                        </Suspense>
                    </Route>
                    <Route exact path="/success">
                        <Suspense fallback={null}>
                            <Navbar />
                            <Success />
                            <Partners />
                            <Footer />
                        </Suspense>
                    </Route>
                    <Route exact path="/mintpanel">
                        <Collections />
                    </Route>
                    <Route exact path="/mintpanel/assets">
                        <Assets />
                    </Route>
                    <Route exact path="/mintpanel/mintnft">
                        <MintNFT />
                    </Route>
                    <Route exact path="/mintpanel/collections">
                        <Collections />
                    </Route>
                    <Route exact path="/mywallet">
                        <MyWallet />
                        <Partners />
                        <Footer />
                    </Route>
                    <Route exact path="/init">
                        <InitAcc />
                    </Route>
                    <Route exact path="/series/:id">
                        <Suspense fallback={null}>
                            <Navbar />
                            <Edition />
                            <NftCommingsoon />
                            <Partners />
                            <Footer />
                        </Suspense>
                    </Route>
                    <Route path="/editions/:id">
                        <Purchase />
                        <NftCommingsoon />
                        <Partners />
                        <Footer />
                    </Route>
                    <Route exact path="/">
                        <Suspense fallback={null}>
                            <Navbar />
                            <Series />
                            <NftCommingsoon />
                            <Partners />
                            <Footer />
                        </Suspense>
                    </Route>
                    <Route>
                        <NotFound />
                    </Route>
                </Switch>
            </Router>
            <ToastContainer position="top-right" delay="5000" />
        </RecoilRoot>
    </React.StrictMode>,
    document.getElementById("root")
);

reportWebVitals();
