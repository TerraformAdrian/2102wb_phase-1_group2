import { useEffect } from "react";
import { useState } from "react";
import { useSeriesList } from "../../hooks/use-series-list.hook";
import { SideBar } from "./side_bar";
import axios from "axios";
import Loader from "react-loader-spinner";
import { toast } from "react-toast";
import { useEditionList } from "../../hooks/use-edition-list.hook";
import { Suspense } from "react";

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

function Item({ meta }) {
    return (
        <div className="f3-collections-body-item f3-center">
            <img alt="meta" src={meta.image} width="100px" />
            {meta.name}
        </div>
    );
}

export function SeriesCluster({ meta, reload }) {
    const { editions } = useEditionList(meta.id, reload);

    const getEditionList = () => {
        var res = [];
        for (const prop in editions) {
            res.push(<Item key={editions[prop].id} meta={editions[prop]} />);
        }

        return res;
    };

    return (
        <div className="f3-collections-body">
            <div>
                <div className="f3-center" style={{ paddingRight: "20px" }}>
                    {meta.name}
                    <img alt="meta" src={meta.image} width="100px" height="auto" />
                </div>
            </div>
            <div>Editions&nbsp;</div>
            <div>{getEditionList()}</div>
        </div>
    );
}

export function Assets() {
    const [state, setState] = useState({
        inFile: "",
        inName: "",
    });
    const [asList, setList] = useState([]);
    const [isDirty, setDirty] = useState(true);
    const [upSeriesStatus, setSeriesStatus] = useState(0); // 0: Success, 1: Creating, 2: Error
    const [upEditionStatus, setEditionStatus] = useState(0);
    const { series } = useSeriesList(isDirty);

    useEffect(() => {
        async function fetchData() {
            if (!isDirty) return;

            const assetList = await axios.get(
                process.env.REACT_APP_API_URL + "/v1/assets/list"
            );
            if (assetList.data.success !== "true") return;

            setDirty(false);
            setList(assetList.data.result);
        }
        fetchData()
    }, [isDirty]);

    useEffect(() => {
        setDirty(false);
    }, [isDirty]);

    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
        });
    };

    const handleCreateSeries = async (e) => {
        try {
            setSeriesStatus(1);
            // await fetch(process.env.REACT_APP_API_URL + "/v1/handy-items/create-series", {
            await fetch("http://localhost:3003/v1/handy-items/create-series", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: state.inSeriesName,
                    image: asList[state.inSeriesImg].img_url,
                }),
            });
            setSeriesStatus(0);
            setDirty(true);

            toast.success("Series created successfully!");
        } catch (e) {
            setSeriesStatus(2);
            toast.error("Unexpected error occured while creating series!");
        }
    };

    const handleCreateEdition = async (e) => {
        try {
            setEditionStatus(1);
            //await fetch(process.env.REACT_APP_API_URL + "/v1/handy-items/create-edition", {
            await fetch("http://localhost:3003/v1/handy-items/create-edition", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: state.inEditionName,
                    series: state.inEditionSeries,
                    image: asList[state.inEditionImg].img_url,
                }),
            });
            setEditionStatus(0);
            setDirty(true);
            toast.success("Edition created successfully!");
        } catch (e) {
            setEditionStatus(2);
            toast.error("Unexpected error occured while creating edition!");
        }
    };

    const getSeriesList = () => {
        var res = [];

        for (const prop in series) {
            res.push(
                <option key={prop} value={prop}>
                    {series[prop].name}
                </option>
            );
        }

        return res;
    };

    const getCurrentSeries = () => {
        var res = [];

        for (const prop in series) {
            res.push(<SeriesCluster key={prop} meta={series[prop]} reload={isDirty} />);
        }

        return res;
    };

    return (
        <div>
            <div style={{ paddingLeft: "20px" }}>
                <div>
                    <h3>::Series</h3>
                </div>
                <div className="f3-panel-layout f3-collections-head">
                    <div>
                        <label>Series Name:</label>
                    </div>
                    <div>
                        <input
                            id="inSeriesName"
                            name="inSeriesName"
                            value={state.inSeriesName}
                            onChange={handleChange}
                        />
                    </div>
                    <div></div>
                    <div>
                        <label>Series Image: &nbsp;</label>
                    </div>
                    <div>
                        <select
                            id="inSeriesImg"
                            name="inSeriesImg"
                            onChange={handleChange}
                            value={state.inSeriesImg}
                        >
                            <option value=""></option>
                            {asList.map((item, index) => (
                                <option key={index} value={index}>
                                    {item.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <button
                            className="f3-collections-btn"
                            id=""
                            onClick={handleCreateSeries}
                            disabled={upSeriesStatus === 1}
                        >
                            {upSeriesStatus === 1 && (
                                <Loader
                                    type="Puff"
                                    color="#00BFFF"
                                    height={20}
                                    width={20}
                                    className="f3-inline"
                                />
                            )}
                            CREATE SERIES
                        </button>
                    </div>
                    <div className="f3-collections-hline"></div>
                    <div>
                        <label>Series:</label>
                    </div>
                    <div>
                        <select
                            id="inEditionSeries"
                            name="inEditionSeries"
                            onChange={handleChange}
                            value={state.inEditionSeries}
                        >
                            <option value=""></option>
                            {getSeriesList()}
                        </select>
                    </div>
                    <div></div>
                    <div>
                        <label>Edition Name: </label>
                    </div>
                    <div>
                        <input
                            id="inEditionName"
                            name="inEditionName"
                            value={state.inEditionName}
                            onChange={handleChange}
                        />
                    </div>
                    <div></div>
                    <div>
                        <label>Edition Image: </label>
                    </div>
                    <div>
                        <select
                            id="inEditionImg"
                            name="inEditionImg"
                            onChange={handleChange}
                            value={state.inEditionImg}
                        >
                            <option value=""></option>
                            {asList.map((item, index) => (
                                <option key={index} value={index}>
                                    {item.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <button
                            className="f3-collections-btn"
                            id=""
                            onClick={handleCreateEdition}
                            disabled={upEditionStatus === 1}
                        >
                            {upEditionStatus === 1 && (
                                <Loader
                                    type="Puff"
                                    color="#00BFFF"
                                    height={20}
                                    width={20}
                                    className="f3-inline"
                                />
                            )}
                            CREATE EDITION
                        </button>
                    </div>
                </div>
            </div>
            <div className="hline" />
            <div style={{ paddingLeft: "20px" }}>
                <div>
                    <h3>Current Series</h3>
                </div>
                <div>{getCurrentSeries()}</div>
            </div>
        </div>
    );
}

export function Page() {
    return (
        <Suspense fallback={null}>
            <SideBar />
            <div className="f3-main">
                <Assets />
            </div>
        </Suspense>
    );
}
