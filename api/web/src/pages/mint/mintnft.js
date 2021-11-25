
import {useEffect, useRef} from "react"
import {IDLE} from "../../global/constants"
import {useCurrentUser} from "../../hooks/use-current-user.hook"
import {useAccountItems} from "../../hooks/use-account-items.hook"
import { useIpfsItems } from "../../hooks/use-ipfs-items.hook"
import {Suspense, useState} from "react"
import {Redirect, useHistory} from "react-router-dom"
import AccountItemsCluster from '../../comps/account-items'

import { SideBar } from "./sidebar"
import axios from "axios";

export function MintNFT() {
  const [state, setState] = useState({
    inFile: "",
    inName: ""
  })
  const items = useIpfsItems();

  const handleChange = (e) => {
    setState({
      ...state, 
      [e.target.name]: e.target.value
    })
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
                <input id="inName" name="inName" value={state.inName} />
              </div>
            </div>
            <div className="f3-mintnft-item">
              <div>
                <label>Asset(IPFS): </label>
              </div>
              <div>
                <select id="inAsset" name="inAsset" >
                  <option value=""></option>
                  {
                    items.assets.map(item => (
                      <option value={item.name}>{item.name}</option>
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
                <input id="inQuantity" name="inQuantity" value={state.inQuantity} size="4" className="f3-center" />
              </div>
            </div>
            <div className="f3-mintnft-item">
              <div>
                <label>Serial #'s: </label>
              </div>
              <div>
                <select id="inSerial" name="inSerial" >
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
                <select id="inCollection" name="inCollection" >
                  <option value="A">Zeb Nolan Interview</option>
                </select>
              </div>
            </div>
            <div className="f3-mintnft-item">
              <div>
                <label>Price(USD): </label>
              </div>
              <div>
                <input id="inPrice" name="inPrice" value={state.inPrice} size="8" /><span>&nbsp;$</span>
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
                <select id="inSeries" name="inSeries" >
                  <option value="A">Gold Edition</option>
                </select>
              </div>
            </div>
            <div className="f3-mintnft-item">
              <div>
                <button>MINT NFT</button>
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
