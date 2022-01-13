
import {useEffect, useRef} from "react"
import {IDLE} from "../../global/constants"
import {useCurrentUser} from "../../hooks/use-current-user.hook"
import {useAccountItems} from "../../hooks/use-account-items.hook"
import { useIpfsItems } from "../../hooks/use-ipfs-items.hook"
import { useEditionList } from "../../hooks/use-edition-list.hook"
import { useSeriesList } from "../../hooks/use-series-list.hook"
import { useSetAllList } from "../../hooks/use-set-all.hook"
import { useSetItem } from "../../hooks/use-set-item.hook"
import {Suspense, useState} from "react"
import {Redirect, useHistory} from "react-router-dom"
import AccountItemsCluster from '../../comps/account-items'

import { SideBar } from "./side_bar"
import axios from "axios";

export const pinFileToIPFS = async (pinataApiKey, pinataSecretApiKey, imgData) => {
  const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
  
  console.log(imgData);

  let data = new FormData();
  data.append('file', imgData.obj.files[0]);
  
  const metadata = JSON.stringify({
      name: imgData.name,
      keyvalues: {
        name: imgData.name
      }
  });
  data.append('pinataMetadata', metadata);
  
  const pinataOptions = JSON.stringify({
      cidVersion: 0,
      customPinPolicy: {
          regions: [
              {
                  id: 'FRA1',
                  desiredReplicationCount: 1
              },
              {
                  id: 'NYC1',
                  desiredReplicationCount: 2
              }
          ]
      }
  });
  data.append('pinataOptions', pinataOptions);

  return axios
      .post(url, data, {
          maxBodyLength: 'Infinity',
          headers: {
              'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
              pinata_api_key: pinataApiKey,
              pinata_secret_api_key: pinataSecretApiKey
          }
      })
      .then(function (response) {
          axios.post(process.env.REACT_APP_API_URL + "/v1/assets/upload", {
            name: imgData.name,
            path: "https://cloudflare-ipfs.com/ipfs/" + response.data.IpfsHash
          })
      })
      .catch(function (error) {
          //handle error here
      });
};

export function Item({meta}) {
  const item = useSetItem(meta["id"]);

  console.log(meta["id"]);
  console.log(item);

  return (
    <div className="f3-store-series-item">
      <img src={meta.image} /> <br />
      <a href={"/editions/" + meta.id}>{meta.name} Edition</a>
    </div>
  )

}

export function WrappedItem(props) {
  return (
    <Suspense fallback={null}>
      <Item {...props} />
    </Suspense>
  )
}

export function SeriesCluster({meta, reload}) {
  console.log(typeof meta.id);
  const { editions } = useEditionList(meta.id, reload);

  const getEditionList = () => {
    var res = [];

    for (const prop in editions) {
      res.push(
        <Item meta={editions[prop]} />
      )
    }

    return res;
  }

  return (
    <div className="f3-collections-body">
      <div>
        <div className="f3-center" style={{paddingRight: "20px"}}>
          { meta.name }
          <img src={meta.image} width="100px" height="auto" />
        </div>
      </div>
      <div>
        Editions&nbsp;
      </div>
      <div>
        { getEditionList() }
      </div>
    </div>
  )
}

export function MintNFT() {
  const [state, setState] = useState({
    inName: "",
    inAsset: "",
    inQuantity: "0",  
    inSerial: "yes",
    inSeries: "",
    inPrice: "",
    inEdition: "-1"
  })
  const items = useIpfsItems();
  const { series } = useSeriesList(true);
  const { editions } = useEditionList(state.inSeries);
  const { sets } = useSetAllList();

  const handleChange = (e) => {
    setState({
      ...state, 
      [e.target.name]: e.target.value
    })
  }

  const handleMint = (e) => {
    e.preventDefault();
/*
    mintItem({
      name: state.inName,
      tokenURI: items.assets[state.inAsset].img_url,
      quantity: state.inQuantity,
      isSerial: state.inSerial,
      collection: state.inSeries,
      price: state.inPrice,
      series: state.inEdition
    })
*/
    createSet({
      name: state.inName,
      desc: state.inDescription,
      thumb: items.assets[state.inThumb].img_url,
      quantity: state.inQuantity,
      isSerial: state.inSerial,
      series: state.inSeries,
      price: state.inPrice,
      edition: state.inEdition
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

  const createSet = async (params) => {
      //await fetch(process.env.REACT_APP_API_URL + "/v1/handy-items/create-set", {
      await fetch("http://localhost:3003/v1/handy-items/create-set", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    })
  }

  const editionList = () => {
    var res = [];
    
    for (const prop in editions) {
      res.push(<option key={prop} value={prop}>{editions[prop].name}</option>)
    }

    return res;
  }

  const seriesList = () => {
    var res = [];
    
    for (const prop in series) {
      res.push(<option key={prop} value={prop}>{series[prop].name}</option>)
    }

    return res;
  }

  const setList = () => {
    var res = [];
    
    for (const prop in sets) {
      res.push(<WrappedItem key={prop} meta={sets[prop]} />)
    }

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
                <label>NFT Thumbnail: </label>
              </div>
              <div>
                <select id="inThumb" name="inThumb" onChange={handleChange} value={state.inThumb} >
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

          {/* First Row: Name and Asset(IPFS) */}
          <div className="f3-mintnft-row">
            <div className="f3-mintnft-item">
              <div>
                <label>Description: </label>
              </div>
              <div>
                <textarea id="inDescription" name="inDescription" value={state.inDescription} onChange={handleChange}>
                  &nbsp;
                </textarea>
              </div>
            </div>
            <div className="f3-mintnft-item">
              <div>
                <label>NFT Asset: </label>
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

          {/* Third Row: Series and Price */}
          <div className="f3-mintnft-row">
            <div className="f3-mintnft-item">
              <div>
                <label>Series: </label>
              </div>
              <div>
                <select id="inSeries" name="inSeries" value={state.inSeries} onChange={handleChange}>
                  <option value=""></option>
                  { seriesList() }
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

          {/* Fourth Row: Edition and Mint Button */}
          <div className="f3-mintnft-row">
            <div className="f3-mintnft-item">
              <div>
                <label>Edition: </label>
              </div>
              <div>
                <select id="inEdition" name="inEdition" value={state.inEdition} onChange={handleChange}>
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
            <h3>Current NFTs</h3>
            { setList() }
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
