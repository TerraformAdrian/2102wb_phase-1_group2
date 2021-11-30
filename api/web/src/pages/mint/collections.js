
import {useEffect, useRef} from "react"
import {IDLE} from "../../global/constants"
import {useCurrentUser} from "../../hooks/use-current-user.hook"
import {useAccountItems} from "../../hooks/use-account-items.hook"
import {Suspense, useState} from "react"
import {Redirect, useHistory} from "react-router-dom"
import AccountItemsCluster from '../../comps/account-items'

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
  const inputFile = useRef(null);

  useEffect(async () => {
    if (!isDirty) return;

    const assetList = await axios.get(process.env.REACT_APP_API_URL + "/v1/assets/list");
    if (assetList.data.success != "true") return;

    setDirty(false);
    setList(assetList.data.result);
  }, [isDirty])

  const handleUpload = async (e) => {
    e.preventDefault();

    console.log(inputFile);

    if (state.inFile.length == 0) return;

    await pinFileToIPFS(
      PINATA_API_KEY, 
      PINATA_SECRET_API_KEY, {
        name: state.inName,
        path: state.inFile,
        obj: inputFile.current
      });
    setDirty(true);
  }

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
          <h3>::Collections</h3>
        </div>
        <div className="f3-panel-layout f3-collections-head">
          <div>
            <label>Collection Name:</label>
          </div>
          <div>
            <input id="inName" name="inName" value={state.inName} onChange={handleChange} />
          </div>
          <div></div>
          <div>
            <label>Collection Image: &nbsp;</label>
          </div>
          <div>
            <input type="file" id="inFile" name="inFile" value={state.inFile} onChange={handleChange} ref={inputFile}/>
          </div>
          <div>
            <button class="f3-collections-btn" id="" onClick={handleUpload}>CREATE COLLECTION</button>
          </div>
          <div className="f3-collections-hline">
          </div>
          <div>
            <label>Collection:</label>
          </div>
          <div>
            <input id="inName" name="inName" value={state.inName} onChange={handleChange} />
          </div>
          <div></div>
          <div>
            <label>Series Name: </label>
          </div>
          <div>
            <input id="inName" name="inName" value={state.inName} onChange={handleChange} />
          </div>
          <div></div>
          <div>
            <label>Series Image: </label>
          </div>
          <div>
            <input type="file" id="inFile" name="inFile" value={state.inFile} onChange={handleChange} ref={inputFile}/>
          </div>
          <div>
            <button class="f3-collections-btn" id="" onClick={handleUpload}>CREATE SERIES</button>
          </div>
        </div>
      </div>
      <div className="hline" />
      <div style={{paddingLeft: "20px"}}>
        <div>
          <h3>Current Collections</h3>
          {
            asList.map(item => (
              <div className="f3-current-asset">
                <div>
                  <img 
                    src={item.img_url}
                    width="78px"
                    height="49px"
                  />
                </div>
                <div>
                  <div>
                    <span>{item.name}</span>
                  </div>
                  <div>
                    <a href={item.img_url} target="_blank">{item.img_url}</a>
                  </div>
                </div>
              </div>
            ))
          }
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
