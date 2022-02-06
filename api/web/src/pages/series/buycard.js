import Player from "../../assets/images/player.png";
import Fileearmark from "../../assets/images/fileearmark.png";
import { Link } from "react-router-dom";

export function BuyCard(props) {
    var metadata = props.data.metadata;

    return (
        <div className="sa_series_single_section py-50px md:py-100px">
            <div className="container max-w-full px-4 m-auto w-1232">
                <div className="sa_series_nft_card_wrapper lg:flex lg:items-center lg:justify-between">
                    <div className="sa_series_singlr_cart_image">
                        <img
                            src={metadata["thumb_image"]}
                            alt="Zeb Noland - White Edition"
                            className="w-full"
                        />
                    </div>
                    <div className="max-w-full mt-5 ml-0 sa_nft_cart_info lg:w-585 lg:mt-0 lg:ml-12 xl:ml-77px">
                        <h2 className="mb-3 not-italic font-semibold text-white capitalize sa_single_cart_title text-20px md:text-24px lg:text-30px xl:text-40px leading-24 md:leading-29 lg:leading-36 xl:leading-48 font-oswald md:mb-4 lg:mb-6 xl:mb-8">
                            SportsCast - {props.data.seriesname}{" "}
                            {props.data.editionname} Edition
                        </h2>

                        <p className="mb-3 text-base not-italic font-normal sa_single_cart_content text-secondary leading-24 md:mb-4 lg:mb-6 xl:mb-10">
                            {metadata["description"]}
                        </p>

                        <div className="mb-4 cart_player_info md:mb-6 lg:mb-8">
                            <ul className="md:flex space-y-2.5 md:space-y-0 md:space-x-2.5">
                                <li className="flex items-center space-x-2 player_info">
                                    <span className="text-sm not-italic font-normal uppercase player text-blue-light leading-17">
                                        Player
                                    </span>
                                    <img src={Player} alt="Player" />
                                    <h6 className="max-w-full text-base not-italic font-medium capitalize player_name text-secondary w-95px leading-19 font-oswald">
                                        {metadata["name"]}
                                    </h6>
                                </li>
                                <li className="flex items-center space-x-2 edition_info">
                                    <span className="text-sm not-italic font-normal uppercase text-blue-light leading-17">
                                        Edition
                                    </span>
                                    <span className="w-[32px] h-[32px] rounded-full border bg-white"></span>
                                    <h6 className="max-w-full text-base not-italic font-medium capitalize text-secondary w-95px leading-19 font-oswald">
                                        {props.data.editionname}
                                    </h6>
                                </li>
                                <li className="flex items-center space-x-3 amount_info ">
                                    <span className="text-sm not-italic font-normal uppercase text-blue-light leading-17">
                                        Available
                                    </span>
                                    <img src={Fileearmark} alt="icon" />
                                    <h6 className="max-w-full text-base not-italic font-medium capitalize text-secondary w-95px leading-19 font-oswald">
                                        {props.data.quantity -
                                            props.data.numberMinted}
                                    </h6>
                                </li>
                            </ul>
                        </div>

                        <div className="relative cart_button">
                            <div className="single_cart_button ">
                                <Link
                                    to="#"
                                    className="single_cart_button py-4 md:py-22.5px pr-7 pl-9 md:pl-99px bg-white rounded-2.25rem md:h-16 block md:inline-block lg:block text-center md:text-current w-full hover:bg-white  max-w-full text-purple text-base leading-19 font-semibold not-italic text-center"
                                >
                                    <span className="cart_amount absolute  left-2 top-1 md:top-2  text-white leading-24 font-semibold font-oswald not-italic text-base py-3 px-7 bg-purple rounded-2.25rem">
                                        ${props.data.price}
                                    </span>
                                    Buy now
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
