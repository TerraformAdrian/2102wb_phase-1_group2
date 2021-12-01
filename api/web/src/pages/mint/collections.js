
import {useEffect, useRef} from "react"
import {IDLE} from "../../global/constants"
import {useCurrentUser} from "../../hooks/use-current-user.hook"
import {useAccountItems} from "../../hooks/use-account-items.hook"
import {Suspense, useState} from "react"
import {Redirect, useHistory} from "react-router-dom"
import AccountItemsCluster from '../../comps/account-items'

import { useSeriesList } from "../../hooks/use-series-list.hook"

import { SideBar } from "./sidebar"
import axios from "axios";
import fs from "fs";

import "./index.css"

const PINATA_API_KEY = "8b0d90ef4bf74827eb88";
const PINATA_SECRET_API_KEY = "609ec3e0c1641f4b41c0c6370eed55e108cea9f9396b9e5a1d123061de07b99b";

export const pinJSONToIPFS = (pinataApiKey, pinataSecretApiKey, JSONBody) => {
    const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
    return axios
        .post(url, JSONBody, {
            headers: {
                pinata_api_key: pinataApiKey,
                pinata_secret_api_key: pinataSecretApiKey
            }
        })
        .then(function (response) {
            
        })
        .catch(function (error) {
            
        });
};

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


export function Assets() {
  const [state, setState] = useState({
    inFile: "",
    inName: ""
  })
  const [asList, setList] = useState([]);
  const [isDirty, setDirty] = useState(true);
  const { series } = useSeriesList();

  useEffect(async () => {
    if (!isDirty) return;

    const assetList = await axios.get(process.env.REACT_APP_API_URL + "/v1/assets/list");
    if (assetList.data.success != "true") return;

    setDirty(false);
    setList(assetList.data.result);
  }, [isDirty])

  const handleChange = (e) => {
    setState({
      ...state, 
      [e.target.name]: e.target.value
    })
  }

  const handleCreateSeries = async (e) => {

    //await fetch(process.env.REACT_APP_API_URL + "/v1/handy-items/create-series", {
    await fetch("http://localhost:3003/v1/handy-items/create-series", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: state.inSeriesName,
          image: asList[state.inSeriesImg].img_url
        }),
      })
  }

  const handleCreateEdition = async (e) => {

    //await fetch(process.env.REACT_APP_API_URL + "/v1/handy-items/create-series", {
    await fetch("http://localhost:3003/v1/handy-items/create-edition", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: state.inEditionName,
        series: state.inEditionSeries,
        image: asList[state.inEditionImg].img_url
      }),
    })
  }

  const getSeriesList = () => {
    var res = [];

    for (const prop in series) {
      res.push(<option key={prop} value={prop}>{series[prop].name}</option>)
    }

    return res;
  }

  const getSeriesListFor = () => {
    var res = [];

    for (const prop in series) {
      res.push(
        <div>
          <img src={series[prop].image} />
        </div>
      )
    }

    return res;
  }

  return (
    <div>
      <div style={{paddingLeft: "20px"}}>
        <div>
          <h3>::Series</h3>
        </div>
        <div className="f3-panel-layout f3-collections-head">
          <div>
            <label>Series Name:</label>
          </div>
          <div>
            <input id="inSeriesName" name="inSeriesName" value={state.inSeriesName} onChange={handleChange} />
          </div>
          <div></div>
          <div>
            <label>Series Image: &nbsp;</label>
          </div>
          <div>
            <select id="inSeriesImg" name="inSeriesImg" onChange={handleChange} value={state.inSeriesImg} >
              <option value=""></option>
              {
                asList.map((item, index) => (
                  <option key={index} value={index}>{item.name}</option>
                ))
              }
            </select>
          </div>
          <div>
            <button class="f3-collections-btn" id="" onClick={handleCreateSeries}>CREATE SERIES</button>
          </div>
          <div className="f3-collections-hline">
          </div>
          <div>
            <label>Series:</label>
          </div>
          <div>
            <select id="inEditionSeries" name="inEditionSeries" onChange={handleChange} value={state.inEditionSeries}>
              <option value=""></option>
              { getSeriesList() }
            </select>
          </div>
          <div></div>
          <div>
            <label>Edition Name: </label>
          </div>
          <div>
            <input id="inEditionName" name="inEditionName" value={state.inEditionName} onChange={handleChange} />
          </div>
          <div></div>
          <div>
            <label>Edition Image: </label>
          </div>
          <div>
            <select id="inEditionImg" name="inEditionImg" onChange={handleChange} value={state.inEditionImg} >
              <option value=""></option>
              {
                asList.map((item, index) => (
                  <option key={index} value={index}>{item.name}</option>
                ))
              }
            </select>
          </div>
          <div>
            <button class="f3-collections-btn" id="" onClick={handleCreateEdition}>CREATE EDITION</button>
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
        <Assets />
      </div>
    </div>
  )
}
