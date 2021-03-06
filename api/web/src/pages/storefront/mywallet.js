import { Suspense } from "react";
import { useAccountItem } from "../../hooks/use-account-item.hook";
import { useAccountItems } from "../../hooks/use-account-items.hook";
import { useCurrentUser } from "../../hooks/use-current-user.hook";
import { Page as Navbar } from "../navbar";
import { MyWalletHeader } from "../mywallet/mywallet";
import { Link } from "react-router-dom";
import video_poster from "../../assets/images/video_poster.png";
import { ReactComponent as VideoIcon } from "../../assets/images/video_icon.svg";

export function Item({ addr, id }) {
    const item = useAccountItem(addr, id);

    const getVideoPath = (ename) => {
        var path = "https://s3.us-west-2.amazonaws.com/nft.ikonicc.ca/";
        //s3.us-west-2.amazonaws.com/nft.ikonicc.ca/ZebNoland_Partx_Gold_Edition.mp4
        if (ename === "Gold") path += "ZebNoland_Partx_Gold_Edition.mp4";
        else if (ename === "Prism") path += "ZebNoland_Part4_Prism_Edition.mp4";
        else if (ename === "Orange")
            path += "ZebNoland_Part3_Orange_Edition.mp4";
        else if (ename === "Pink") path += "ZebNoland_Part2_Pink_Edition.mp4";
        else if (ename === "White") path += "ZebNoland_Part1_White_Edition.mp4";
        return path
    };

    return item.item ? (
        <div>
            <div className="sc_purchase_series_section mb-[40px]">
                <div className="container w-1232 m-auto px-4 max-w-full">
                    <div className="sc_pur_ser_wrapper lg:flex md:items-center lg:justify-between p-3 md:p-6 border border-solid border-purple rounded-16">
                        <div className="cart_pur_details w-[100%] sm:w-[253px] lg:mr-[20px]">
                            <h3 className="pur_cart_title text-white text-lg leading-24 font-medium font-oswald not-italic capitalize mb-2">
                                {item.set.metadata["name"]} -{" "}
                                {item.edition.name} Edition
                            </h3>
                            <p className="pur_cart_rate text-white py-1.5 px-2.5 bg-purple text-xs leading-14 font-extrabold not-italic uppercase  rounded-[30px] mb-2 inline-block">
                                #{item.item.serialID}{" "}
                                <span className="opacity-50 font-normal">
                                    / {item.set.quantity}
                                </span>
                            </p>
                            <p className="pur_date text-white text-xs leading-14 font-normal not-italic mb-2">
                                <span className="text-blue-light">
                                    Purchase Date :{" "}
                                </span>
                                <span className="uppercase">Jan 33333333333, 2022</span>
                            </p>
                            <p className="owner_address text-white text-xs leading-14 font-normal not-italic mb-6">
                                <span className="text-blue-light">
                                    Owner Address :{" "}
                                </span>
                                <span className="uppercase">
                                    {item.item.owner}
                                </span>
                            </p>
                            <img
                                src={item.set.metadata["thumb_image"]}
                                alt={item.edition.name}
                                className="w-full"
                            />
                            <div className="sa_pur_button mt-4 mb-5 lg:mb-0 lg:mt-6  grid grid-cols-2 gap-4 ">
                                <Link
                                    to="#"
                                    className="w-full  sc_conning_soon_button text-white py-4 text-center inline-block  px-3 lg:px-3 bg-blue-light border border-solid border-blue-light rounded-2.25rem box-border text-sm leading-19 font-normal not-italic group whitespace-nowrap"
                                >
                                    <span className="hidden group-hover:block">
                                        Coming Soon
                                    </span>
                                    <span className="block group-hover:hidden">
                                        Sell
                                    </span>
                                </Link>

                                
                                <Link
                                    to="#"
                                    className="w-full sc_trade_button text-blue-light py-4 text-center inline-block px-3 xl:px-3 border border-solid border-blue-light rounded-2.25rem box-border text-sm leading-19 font-normal not-italic group whitespace-nowrap"
                                >
                                    <span className="hidden group-hover:block">
                                        Coming Soon
                                    </span>
                                    <span className="block group-hover:hidden">
                                        Trade
                                    </span>
                                </Link>
                            </div>
                        </div>
                        <div className="cart_pur_video relative mt-6 xl:mt-0 ml-0">
                            <video
                                className="w-auto border border-solid border-purple rounded-16 aspect-video"
                                poster={video_poster}
                                src={getVideoPath(item.edition.name)}
                                controls="controls"
                            />
                            <span className="video_icon absolute block top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
                                <VideoIcon />
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ) : (
        <div></div>
    );
}

export function Page() {
    const [user] = useCurrentUser();
    const { ids } = useAccountItems(user.addr);

    return (
        <div className="f3-store-padding">
            <div className="f3-store-hline"></div>
            <div className="f3-store-padding">
                <MyWalletHeader />
                <div className="pt-2.5 md:pt-5 pb-50px md:pb-100px">
                    {ids.map((item) => (
                        <Item addr={user.addr} id={item} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export function WrappedPage(props) {
    return (
        <Suspense fallback={null}>
            <Navbar />
            <Page {...props} />
        </Suspense>
    );
}
