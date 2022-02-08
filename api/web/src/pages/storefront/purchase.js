import { Suspense, useState } from "react";
import { useParams, useHistory } from "react-router";
import { useAccountItem } from "../../hooks/use-account-item.hook";
import { useSetItem } from "../../hooks/use-set-item.hook";
import { useSeriesItem } from "../../hooks/use-series-item.hook";
import { useEditionItem } from "../../hooks/use-edition-item.hook";
import { purchaseHandyItem } from "../../flow/tx.purchase-handy-item";
import { useCurrentUser } from "../../hooks/use-current-user.hook";
import { useInitialized } from "../../hooks/use-initialized.hook";
import { Page as Navbar } from "../navbar";
import { Link } from "react-router-dom";
import Player from "../../assets/images/player.png";
import Fileearmark from "../../assets/images/fileearmark.png";

import { toast } from "react-toast";
import Loader from "react-loader-spinner";

export function Page() {
    const history = useHistory();
    const handleRoute = () => history.push("/success");
    let { id } = useParams();
    const { item, reload } = useSetItem(id);

    const [user, loggedIn, { signUp, logIn }] = useCurrentUser();

    const { series } = useSeriesItem(
        Object.keys(item).length != 0 ? item.seriesID : ""
    );
    const { edition } = useEditionItem(
        Object.keys(item).length != 0 ? item.editionID : ""
    );
    const init = useInitialized(user.addr);
    const [buyingState, setBuyingState] = useState(0); // 0: Normal, 1: Buying, 2: Error

    const handlePurchase = (e) => {
        e.preventDefault();

        purchaseHandyItem(
            {
                setID: id,
                ownerAddress: process.env.REACT_APP_CONTRACT_HANDY_ITEMS,
            },
            {
                onStart() {
                    setBuyingState(1);
                },
                async onSuccess() {
                    setBuyingState(0);
                    toast.success("Successfully purchased!");
                    setTimeout(() => {
                        handleRoute();
                    }, 1500);
                },
                async onComplete() {
                    reload();
                },
                async onError(error) {
                    setBuyingState(2);
                    toast.error("Unexpected error occured! \n" + error);
                    console.log(error);
                },
            }
        );
    };

    const handleLogin = (e) => {
        logIn();
    };

    const handleInitializeWallet = (e) => {
        e.preventDefault();

        init.initialize(user.addr);
    };

    var price = (Math.round(item.price * 100) / 100).toFixed(2);

    return Object.keys(item).length != 0 ? (
        <div>
            <Navbar />
            <div className="f3-store-padding">
                <div>
                    <div className="f3-store-hline"></div>
                </div>
                <div className="sa_series_single_section py-50px md:py-100px">
                    <div className="container max-w-full px-4 m-auto w-1232">
                        <div className="sa_series_nft_card_wrapper lg:flex lg:items-center lg:justify-between">
                            <div className="sa_series_singlr_cart_image">
                                <img
                                    src={item.metadata["thumb_image"]}
                                    alt="Zeb Noland - White Edition"
                                    className="w-[538px] max-w-full"
                                />
                            </div>
                            <div className="max-w-full mt-5 ml-0 sa_nft_cart_info lg:w-585 lg:mt-0 lg:ml-12 xl:ml-77px">
                                <h2 className="mb-3 not-italic font-semibold text-white capitalize sa_single_cart_title text-20px md:text-24px lg:text-30px xl:text-40px leading-24 md:leading-29 lg:leading-36 xl:leading-48 font-oswald md:mb-4 lg:mb-6 xl:mb-8">
                                    SportsCast - {series.name} {edition.name}{" "}
                                    Edition
                                </h2>

                                <p className="mb-3 text-base not-italic font-normal sa_single_cart_content text-secondary leading-24 md:mb-4 lg:mb-6 xl:mb-10">
                                    {item.metadata["description"]}
                                </p>

                                <div className="mb-4 cart_player_info md:mb-6 lg:mb-8">
                                    <ul className="md:flex space-y-2.5 md:space-y-0 md:space-x-2.5 justify-start">
                                        {/* <li className="player_info flex space-x-2 items-center sm:justify-center sm:w-[179px] w-full">
                                            <span className="text-sm not-italic font-normal uppercase player text-blue-light leading-17">
                                                Player
                                            </span>
                                            <div className="w-8 h-8 bg-center bg-[length:150%] rounded-full"  style={{backgroundImage:`url(${item.metadata["thumb_image"]})`}}  ></div>
                                            <h6 className="text-base not-italic font-medium capitalize player_name text-secondary leading-19 font-oswald">
                                                {item.metadata["name"]}
                                            </h6>
                                        </li> */}
                                        <li className="edition_info flex space-x-2 items-center sm:justify-start sm:w-[179px] w-full">
                                            <span className="text-sm not-italic font-normal uppercase text-blue-light leading-17">
                                                Edition
                                            </span>
                                            <span className=" w-[32px] h-[32px] rounded-full bg-white"></span>
                                            <h6 className="text-base not-italic font-medium capitalize text-secondary leading-19 font-oswald">
                                                {edition.name}
                                            </h6>
                                        </li>
                                        <li className="amount_info flex items-center space-x-3 sm:justify-start sm:w-[179px] w-full">
                                            <span className="text-sm not-italic font-normal uppercase text-blue-light leading-17">
                                                Available
                                            </span>
                                            <img src={Fileearmark} alt="icon" />
                                            <h6 className="text-base not-italic font-medium capitalize text-secondary leading-19 font-oswald">
                                                {item.quantity -
                                                    item.numberMinted}
                                            </h6>
                                        </li>
                                    </ul>
                                </div>

                                <div className="relative cart_button">
                                    <div className="single_cart_button ">
                                        {loggedIn != true ? (
                                            <button
                                                type="button"
                                                className="single_cart_button py-4 md:py-22.5px pr-7 pl-9 md:pl-99px bg-white rounded-2.25rem md:h-16 block md:inline-block lg:block text-center md:text-current w-full hover:bg-white  max-w-full text-purple text-base leading-19 font-semibold not-italic text-center"
                                                onClick={handleLogin}
                                            >
                                                <span className="cart_amount absolute left-1 sm:left-2 top-1 md:top-2  text-white leading-24 font-semibold font-oswald not-italic text-base p-[0.65rem] sm:py-3 sm:px-7 bg-purple rounded-2.25rem">
                                                    ${price}
                                                </span>
                                                Connect Wallet
                                            </button>
                                        ) : init.isInitialized == true ? (
                                            <button
                                                type="button"
                                                className="single_cart_button py-4 md:py-22.5px pr-7 pl-9 md:pl-99px bg-white rounded-2.25rem md:h-16 block md:inline-block lg:block text-center md:text-current w-full hover:bg-white  max-w-full text-purple text-base leading-19 font-semibold not-italic text-center"
                                                onClick={handlePurchase}
                                                disabled={buyingState == 1}
                                            >
                                                {buyingState == 1 && (
                                                    <Loader
                                                        type="Oval"
                                                        color="#902CF2"
                                                        strokeWidth={10}
                                                        secondaryColor="yellow"
                                                        height={20}
                                                        width={20}
                                                        className="f3-inline absolute right-[30px] transofrm translate-y-[-2px]"
                                                    />
                                                )}
                                                <span className="cart_amount absolute left-1 sm:left-2 top-1 md:top-2  text-white leading-24 font-semibold font-oswald not-italic text-base p-[0.65rem] sm:py-3 sm:px-7 bg-purple rounded-2.25rem">
                                                    ${price}
                                                </span>
                                                Purchase
                                            </button>
                                        ) : (
                                            <button
                                                type="button"
                                                className="single_cart_button py-4 md:py-22.5px pr-7 pl-9 md:pl-99px bg-white rounded-2.25rem md:h-16 block md:inline-block lg:block text-center md:text-current w-full hover:bg-white  max-w-full text-purple text-base leading-19 font-semibold not-italic text-center"
                                                onClick={handleInitializeWallet}
                                            >
                                                {" "}
                                                <span className="cart_amount absolute  left-1 sm:left-2 top-1 md:top-2  text-white leading-24 font-semibold font-oswald not-italic text-base p-[0.65rem] sm:py-3 sm:px-7 bg-purple rounded-2.25rem">
                                                    ${price}
                                                </span>
                                                Initialize Wallet
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ) : (
        <div>
            <Navbar />
        </div>
    );
}

export function WrappedPage(props) {
    return (
        <Suspense fallback={null}>
            <Page {...props} />
        </Suspense>
    );
}
