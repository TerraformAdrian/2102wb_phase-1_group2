import { ReactComponent as Logo } from "../../assets/images/logo.svg";
import { ReactComponent as Facebook } from "../../assets/images/facebook.svg";
import { ReactComponent as Twitter } from "../../assets/images/twitter.svg";
import { ReactComponent as Instagram } from "../../assets/images/instagram.svg";
import { ReactComponent as Linkedin } from "../../assets/images/linkedin.svg";
import { Link } from "react-router-dom";
import "../../index.css";

export function Footer() {
    return (
        <footer className="bg-primary py-50px md:py-60px">
            <div className="container max-w-full px-4 m-auto w-1232">
                <div className="block footer_details md:flex md:justify-between">
                    <div className="footer-info">
                        <Logo />
                        <h4 className="my-6 not-italic font-semibold text-white capitalize footer-title font-oswald text-18px md:text-24px leading-24 md:leading-29">
                            Transforming Sports Media Collectibles
                        </h4>
                        <ul className="space-y-1 location-info md:space-y-0">
                            <li className="text-base not-italic font-normal address text-secondary leading-24">
                                8033 Sunset Blvd., Suite IBNS 1037 Los Angeles,
                                California 90046
                            </li>
                            <li className="text-base not-italic font-normal phone_number text-secondary leading-24">
                                <Link to="tel:(310) 299-1717">
                                    (310) 299-1717
                                </Link>
                            </li>
                            <li className="text-base not-italic font-normal copyright-text text-secondary leading-24">
                                Copyright © 2022 SportsCast. Please view { ' '}
                                <a href="https://sportscast.net/disclaimer/">Disclaimers</a>.
                            </li>
                        </ul>
                    </div>
                    <div className="footer-inner-details mt-7 md:pt-2.5">
                        <div className="mr-4 footer-menu-info">
                            <ul className="footer-menu space-x-9">
                                <li className="inline-block text-base not-italic font-normal capitalize leading-19">
                                    <a href="https://sportscast.net/" className="text-secondary">
                                        Home
                                    </a>
                                </li>
                                <li className="inline-block text-base not-italic font-normal capitalize leading-19">
                                    <a href="https://sportscast.net/about/" className="text-secondary">
                                        about
                                    </a>
                                </li>
                                <li className="inline-block text-base not-italic font-normal capitalize leading-19">
                                    <a href="https://sportscast.net/contact/" className="text-secondary">
                                        Contact
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="mt-5 social_media_info md:mt-42px md:float-right">
                            <ul className="flex space-x-4 social_list">
                                <li className="inline-block facebook ">
                                    <a
                                        target="_blank"
                                        href="https://www.facebook.com/SportsCastPros"
                                        className="text-white relative block w-39 h-39 rounded-19.5 border border-solid border-white border-opacity-25  flex items-center justify-center hover:border-opacity-100 hover:transition-all hover:bg-purple" rel="noreferrer"
                                    >
                                        <span className="block">
                                            {" "}
                                            <Facebook />
                                        </span>
                                    </a>
                                </li>
                                <li className="inline-block linkedin">
                                    <a
                                        target="_blank"
                                        href="https://www.linkedin.com/company/sportscast"
                                        className="text-white relative block w-39 h-39 rounded-19.5 border border-solid border-white border-opacity-25 flex items-center justify-center hover:border-opacity-100 hover:transition-all hover:bg-purple" rel="noreferrer"
                                    >
                                        <span className="block">
                                            {" "}
                                            <Linkedin />
                                        </span>
                                    </a>
                                </li>
                                <li className="inline-block twitter">
                                    <a
                                        target="_blank"
                                        href="https://twitter.com/SportsCastPros"
                                        className="text-white relative block w-39 h-39 rounded-19.5 border border-solid border-white border-opacity-25 flex items-center justify-center hover:border-opacity-100 hover:transition-all hover:bg-purple" rel="noreferrer"
                                    >
                                        <span className="block ">
                                            {" "}
                                            <Twitter />
                                        </span>
                                    </a>
                                </li>
                                {/* <li className="inline-block instagram">
                                    <Link
                                        target="_blank"
                                        to="#"
                                        className="text-white relative block w-39 h-39 rounded-19.5 border border-solid border-white border-opacity-25 flex items-center justify-center hover:border-opacity-100 hover:transition-all hover:bg-purple"
                                    >
                                        <span className="block">
                                            {" "}
                                            <Instagram />
                                        </span>
                                    </Link>
                                </li> */}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
