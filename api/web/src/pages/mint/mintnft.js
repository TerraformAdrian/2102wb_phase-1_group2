
import {useEffect, useRef} from "react"
import {IDLE} from "../../global/constants"
import {useCurrentUser} from "../../hooks/use-current-user.hook"
import {useAccountItems} from "../../hooks/use-account-items.hook"
import { useIpfsItems } from "../../hooks/use-ipfs-items.hook"
import { useEditionList } from "../../hooks/use-edition-list.hook"
import {Suspense, useState} from "react"
import {Redirect, useHistory} from "react-router-dom"
import AccountItemsCluster from '../../comps/account-items'

import { SideBar } from "./sidebar"
import axios from "axios";

export function MintNFT() {
  const [state, setState] = useState({
    inName: "",
    inAsset: "",
    inQuantity: "0",
    inSerial: "yes",
    inCollection: "0",
    inPrice: "",
    inSeries: "-1"
  })
  const items = useIpfsItems(); 
  const { editions } = useEditionList();

  const handleChange = (e) => {
    setState({
      ...state, 
      [e.target.name]: e.target.value
    })
  }

  const handleMint = (e) => {
    e.preventDefault();

    mintItem({
      name: state.inName,
      tokenURI: items.assets[state.inAsset].img_url,
      quantity: state.inQuantity,
      isSerial: state.inSerial,
      collection: state.inCollection,
      price: state.inPrice,
      series: state.inSeries
    })

  }

  const mintItem = async (params) => {
    console.log(params);

    await fetch(process.env.REACT_APP_API_ITEM_MINT, {
    // await fetch("http://localhost:3003/v1/handy-items/mint", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    })
  }

  const editionList = () => {
    var res = [];
    console.log(editions);
    
    for (const prop in editions) {
      res.push(<option key={prop} value={prop}>{editions[prop].name}</option>)
    }

    console.log(res);
    return res;
  }

  return (
    <div>
      <div style={{paddingLeft: "20px"}}>
        <div>
          <h3>::Mint NFTs</h3>
        </div>
        <div className="f3-panel-layout f3-mintnft-head">
          {/* First Row: Name and Asset(IPFS) */}
          <div className="f3-mintnft-row">
            <div className="f3-mintnft-item">
              <div>
                <label>Name: </label>
              </div>
              <div>
                <input id="inName" name="inName" value={state.inName} onChange={handleChange} />
              </div>
            </div>
            <div className="f3-mintnft-item">
              <div>
                <label>Asset(IPFS): </label>
              </div>
              <div>
                <select id="inAsset" name="inAsset" onChange={handleChange} value={state.inAsset} >
                  <option value=""></option>
                  {
                    items.assets.map((item, index) => (
                      <option key={index} value={index}>{item.name}</option>
                    ))
                  }
                </select>
              </div>
            </div>
          </div>

          {/* Second Row: Quantity and Serial#'s */}
          <div className="f3-mintnft-row">
            <div className="f3-mintnft-item">
              <div>
                <label>Quantity: </label>
              </div>
              <div>
                <input id="inQuantity" name="inQuantity" value={state.inQuantity} 
                       onChange={handleChange} size="4" className="f3-center" />
              </div>
            </div>
            <div className="f3-mintnft-item">
              <div>
                <label>Serial #'s: </label>
              </div>
              <div>
                <select id="inSerial" name="inSerial" value={state.inSerial} onChange={handleChange}>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>
            </div>
          </div>

          {/* Third Row: Collection and Price */}
          <div className="f3-mintnft-row">
            <div className="f3-mintnft-item">
              <div>
                <label>Collection: </label>
              </div>
              <div>
                <select id="inCollection" name="inCollection" value={state.inCollection} onChange={handleChange}>
                  <option value="A">Zeb Nolan Interview</option>
                </select>
              </div>
            </div>
            <div className="f3-mintnft-item">
              <div>
                <label>Price(USD): </label>
              </div>
              <div>
                <input id="inPrice" name="inPrice" value={state.inPrice} onChange={handleChange} size="8" /><span>&nbsp;$</span>
              </div>
            </div>
          </div>

          {/* Fourth Row: Series and Mint Button */}
          <div className="f3-mintnft-row">
            <div className="f3-mintnft-item">
              <div>
                <label>Series: </label>
              </div>
              <div>
                <select id="inSeries" name="inSeries" value={state.inSeries} onChange={handleChange}>
                  <option value="-1"></option>
                  { editionList() }
                </select>
              </div>
            </div>
            <div className="f3-mintnft-item">
              <div>
                <button onClick={handleMint}>MINT NFT</button>
              </div>
              <div>
              </div>
            </div>
          </div>

        </div>
      </div>
      <div className="hline" />
        <div style={{paddingLeft: "20px"}}>
          <div>
            <h3>Current Series</h3>
          </div>
        </div>
    </div>
  )

}

export function Page() {
  return (
    <div>
      <SideBar />
      <div className="f3-main">
        <MintNFT />
      </div>
    </div>
  )
}
