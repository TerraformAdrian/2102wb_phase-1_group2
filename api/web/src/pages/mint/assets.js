import { useEffect, useRef } from "react";
import { useState } from "react";
import { SideBar } from "./side_bar";
import axios from "axios";
import Loader from "react-loader-spinner";
import { toast } from "react-toast";

// IKONICC credentials
// wallet: 0xc1662d3e59d9060b
   const PINATA_API_KEY = "1d8513548fb41e8d4db9";
   const PINATA_SECRET_API_KEY = "8b81f6485e8a662501230df92a13fe30e980f1aa989b218b4608d4e9cf749413";

// This is OLD credentials for the old old dev site..please dont use
// wallet: 0xab5876435fbf2063
// const PINATA_API_KEY = "8b0d90ef4bf74827eb88";
// const PINATA_SECRET_API_KEY = "609ec3e0c1641f4b41c0c6370eed55e108cea9f9396b9e5a1d123061de07b99b";

export const pinJSONToIPFS = (pinataApiKey, pinataSecretApiKey, JSONBody) => {
    const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
    return axios
        .post(url, JSONBody, {
            headers: {
                pinata_api_key: pinataApiKey,
                pinata_secret_api_key: pinataSecretApiKey,
            },
        })
        .then(function (response) { })
        .catch(function (error) { });
};

export function Assets() {
    const [state, setState] = useState({
        inFile: "",
        inName: "",
    });
    const [asList, setList] = useState([]);
    const [isDirty, setDirty] = useState(true);
    const [listingStatus, setListingStatus] = useState(0); // 0: Loading, 1: Success, 2: Error.
    const [uploadStatus, setUploadStatus] = useState(0); // 0: Success, 1: Uploading to IPFS, 2: Uploading to DB
    // 3: IPFS Failed, 4: DB Failed
    const inputFile = useRef(null);

    useEffect(() => {
        async function fetchData() {
            if (!isDirty) return;

            try {
                const assetList = await axios.get(
                    process.env.REACT_APP_API_URL + "/v1/assets/list"
                );
                if (assetList.data.success !== "true") {
                    setListingStatus(2);
                    return;
                }

                setDirty(false);
                setListingStatus(1);
                setList(assetList.data.result);
            } catch (e) {
                setListingStatus(2);
            }
        }
        fetchData()
    }, [isDirty]);

    const handleUpload = async (e) => {
        e.preventDefault();

        console.log(inputFile);

        if (state.inFile.length === 0) return;

        try {
            await pinFileToIPFS(PINATA_API_KEY, PINATA_SECRET_API_KEY, {
                name: state.inName,
                path: state.inFile,
                obj: inputFile.current,
            });

            setDirty(true);
        } catch (e) { }
    };

    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
        });
    };

    const pinFileToIPFS = async (pinataApiKey, pinataSecretApiKey, imgData) => {
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

        setUploadStatus(1);

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
                setUploadStatus(2);
                return axios
                    .post(process.env.REACT_APP_API_URL + "/v1/assets/upload", {
                        name: imgData.name,
                        path:
                            "https://cloudflare-ipfs.com/ipfs/" +
                            response.data.IpfsHash,
                    })
                    .then(function (response) {
                        setUploadStatus(0);
                        toast.success("Upload Succeed.");
                    })
                    .catch(function (error) {
                        setUploadStatus(4);
                        toast.error(
                            "Unexpected error occured while uploading."
                        );
                    });
            })
            .catch(function (error) {
                setUploadStatus(3);
                toast.error("Unexpected error occured while uploading.");
            });
    };

    return (
        <div>
            <div style={{ paddingLeft: "20px" }}>
                <div>
                    <h3>::Assets</h3>
                </div>
                <div className="f3-panel-layout f3-asset">
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
                        <button
                            id=""
                            onClick={handleUpload}
                            disabled={uploadStatus === 1 || uploadStatus === 2}
                        >
                            {(uploadStatus === 1 || uploadStatus === 2) && (
                                <Loader
                                    type="Puff"
                                    color="#00BFFF"
                                    height={20}
                                    width={20}
                                    className="f3-inline"
                                />
                            )}
                            UPLOAD
                        </button>
                    </div>
                </div>
            </div>
            <div className="hline" />
            <div style={{ paddingLeft: "20px" }}>
                <div>
                    <h3>Current Assets</h3>
                    {listingStatus === 0 && (
                        <Loader
                            type="Oval"
                            color="#1f1f1f"
                            height={80}
                            width={80}
                            className="f3-center"
                        />
                    )}
                    {listingStatus === 1 &&
                        asList.map((item) => (
                            <div className="f3-current-asset">
                                <div>
                                    <img alt="item" src={item.img_url} />
                                </div>
                                <div>
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
                            </div>
                        ))}
                    {listingStatus === 2 && (
                        <p className="f3-center">Unexpected error occured!</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export function Page() {
    return (
        <div>
            <SideBar />
            <div className="f3-main">
                <Assets />
            </div>
        </div>
    );
}
