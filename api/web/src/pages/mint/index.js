import { useEffect, useRef } from "react";
import { IDLE } from "../../global/constants";
import { useCurrentUser } from "../../hooks/use-current-user.hook";
import { useAccountItems } from "../../hooks/use-account-items.hook";
import { Suspense, useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import AccountItemsCluster from "../../comps/account-items";

import { SideBar } from "./side_bar";
import axios from "axios";
import fs from "fs";

const PINATA_API_KEY = "8b0d90ef4bf74827eb88";
const PINATA_SECRET_API_KEY =
    "609ec3e0c1641f4b41c0c6370eed55e108cea9f9396b9e5a1d123061de07b99b";

export const pinJSONToIPFS = (pinataApiKey, pinataSecretApiKey, JSONBody) => {
    const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
    return axios
        .post(url, JSONBody, {
            headers: {
                pinata_api_key: pinataApiKey,
                pinata_secret_api_key: pinataSecretApiKey,
            },
        })
        .then(function (response) {})
        .catch(function (error) {});
};

export const pinFileToIPFS = async (
    pinataApiKey,
    pinataSecretApiKey,
    imgData
) => {
    const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;

    console.log(imgData);

    let data = new FormData();
    data.append("file", imgData.obj.files[0]);

    const metadata = JSON.stringify({
        name: imgData.name,
        keyvalues: {
            name: imgData.name,
        },
    });
    data.append("pinataMetadata", metadata);

    const pinataOptions = JSON.stringify({
        cidVersion: 0,
        customPinPolicy: {
            regions: [
                {
                    id: "FRA1",
                    desiredReplicationCount: 1,
                },
                {
                    id: "NYC1",
                    desiredReplicationCount: 2,
                },
            ],
        },
    });
    data.append("pinataOptions", pinataOptions);

    return axios
        .post(url, data, {
            maxBodyLength: "Infinity",
            headers: {
                "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
                pinata_api_key: pinataApiKey,
                pinata_secret_api_key: pinataSecretApiKey,
            },
        })
        .then(function (response) {
            axios.post(process.env.REACT_APP_API_URL + "/v1/assets/upload", {
                // axios.post("http://localhost:3003/v1/assets/upload", {
                name: imgData.name,
                path:
                    "https://cloudflare-ipfs.com/ipfs/" +
                    response.data.IpfsHash,
            });
        })
        .catch(function (error) {
            //handle error here
        });
};

export function Assets() {
    const [state, setState] = useState({
        inFile: "",
        inName: "",
    });
    const [asList, setList] = useState([]);
    const [isDirty, setDirty] = useState(true);
    const inputFile = useRef(null);

    useEffect(async () => {
        if (!isDirty) return;

        // const assetList = await axios.get("http://localhost:3003/v1/assets/list");
        const assetList = await axios.get(
            process.env.REACT_APP_API_URL + "/v1/assets/list"
        );
        if (assetList.data.success != "true") return;

        setDirty(false);
        setList(assetList.data.result);
    }, [isDirty]);

    const handleUpload = async (e) => {
        e.preventDefault();

        console.log(inputFile);

        if (state.inFile.length == 0) return;

        await pinFileToIPFS(PINATA_API_KEY, PINATA_SECRET_API_KEY, {
            name: state.inName,
            path: state.inFile,
            obj: inputFile.current,
        });
        setDirty(true);
    };

    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div>
            <div style={{ paddingLeft: "20px" }}>
                <div>
                    <h3>::Assets</h3>
                </div>
                <div className="f3-asset">
                    <div>
                        <label>Name</label>
                    </div>
                    <div>
                        <input
                            id="inName"
                            name="inName"
                            value={state.inName}
                            onChange={handleChange}
                        />
                    </div>
                    <div></div>
                    <div>
                        <label>Browse for file: &nbsp;</label>
                    </div>
                    <div>
                        <input
                            type="file"
                            id="inFile"
                            name="inFile"
                            value={state.inFile}
                            onChange={handleChange}
                            ref={inputFile}
                        />
                    </div>
                    <div>
                        <button id="" onClick={handleUpload}>
                            UPLOAD
                        </button>
                    </div>
                </div>
            </div>
            <div className="hline" />
            <div style={{ paddingLeft: "20px" }}>
                <div>
                    <h3>Current Assets</h3>
                    {asList.map((item) => (
                        <div className="f3-current-asset">
                            <div>
                                <img
                                    src={item.img_url}
                                    width="78px"
                                    height="49px"
                                />
                            </div>
                            <div>
                                <span>{item.name}</span>
                            </div>
                            <div>
                                <a
                                    href={item.img_url}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    {item.img_url}
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export function Page() {
    const [state, setState] = useState({
        txtAddress: "",
    });
    const [address, setAddress] = useState("");
    const [count, setCount] = useState(0);
    const history = useHistory();
    const [user] = useCurrentUser();

    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
        });
    };

    const handleList = (e) => {
        if (state.txtAddress.length != 18) {
            return;
        }

        setAddress(state.txtAddress);
        setCount(1 - count);
    };

    const handleMint = (e) => {
        e.preventDefault();
        history.push("/publish");
    };

    const handleMarket = (e) => {
        e.preventDefault();
        history.push("/market");
    };

    return (
        <div>
            <SideBar />
            <div className="f3-main">
                <Assets />
            </div>
        </div>
    );
}
