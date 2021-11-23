
import {IDLE} from "../../global/constants"
import {useCurrentUser} from "../../hooks/use-current-user.hook"
import {useAccountItems} from "../../hooks/use-account-items.hook"
import {Suspense, useState} from "react"
import {Redirect, useHistory} from "react-router-dom"
import AccountItemsCluster from '../../comps/account-items'

import { SideBar } from "./sidebar"

import "./index.css"

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

export const pinFileToIPFS = (pinataApiKey, pinataSecretApiKey) => {
  const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
  //we gather a local file for this example, but any valid readStream source will work here.
  let data = new FormData();
  data.append('file', fs.createReadStream('./yourfile.png'));
  //You'll need to make sure that the metadata is in the form of a JSON object that's been convered to a string
  //metadata is optional
  const metadata = JSON.stringify({
      name: 'testname',
      keyvalues: {
          exampleKey: 'exampleValue'
      }
  });
  data.append('pinataMetadata', metadata);
  //pinataOptions are optional
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
          maxBodyLength: 'Infinity', //this is needed to prevent axios from erroring out with large files
          headers: {
              'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
              pinata_api_key: pinataApiKey,
              pinata_secret_api_key: pinataSecretApiKey
          }
      })
      .then(function (response) {
          //handle response here
      })
      .catch(function (error) {
          //handle error here
      });
};

export function Assets() {

  return (
    <div>
      <div style={{paddingLeft: "20px"}}>
        <div>
          <h3>::Assets</h3>
        </div>
        <div className="f3-asset">
          <div>
            <label>Name</label>
          </div>
          <div>
            <input id="inName" name="inName" />
          </div>
          <div></div>
          <div>
            <label>Browse for file: &nbsp;</label>
          </div>
          <div>
            <input type="file" id="inFile" name="inFile" />
          </div>
          <div>
            <button id="">UPLOAD</button>
          </div>
        </div>
      </div>
      <div className="hline" />
      <div style={{paddingLeft: "20px"}}>
        <div>
          <h3>Current Assets</h3>
        </div>
      </div>
    </div>
  )

}

export function Page() {
  const [state, setState] = useState({
    txtAddress: ""
  })
  const [address, setAddress] = useState("");
  const [count, setCount] = useState(0);
  const history = useHistory();
  const [user] = useCurrentUser()

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    })
  }

  const handleList = (e) => {

    if (state.txtAddress.length != 18) {
      alert("Enter Address Corretly!");
      return;
    }

    setAddress(state.txtAddress);
    setCount(1 - count);
  }

  const handleMint = (e) => {
    e.preventDefault();
    history.push("/publish");
  }

  const handleMarket = (e) => {
    e.preventDefault();
    history.push("/market");
  }

  return (
    <div>
      <SideBar />
      <div className="f3-main">
        <Assets />
      </div>
    </div>
  )
}
