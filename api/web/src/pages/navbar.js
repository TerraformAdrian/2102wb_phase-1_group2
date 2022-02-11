import { useCurrentUser } from "../hooks/use-current-user.hook";
import { useInitialized } from "../hooks/use-initialized.hook";
import React, { useState, useEffect } from "react";
import { ReactComponent as Logo } from "../assets/images/logo.svg";
import { ReactComponent as Menuicon } from "../assets/images/menu_white.svg";
import { ReactComponent as Closeicon } from "../assets/images/close_white.svg";
import { Link } from "react-router-dom";
import Loader from "react-loader-spinner";
import axios from "axios";
import "../index.css";
import "./navbar.css";

export function Page() {
  const [user, loggedIn, { logIn, logOut }] = useCurrentUser();
  const [isDepositLoading, setIsDepositLoading] = useState(false);

  const init = useInitialized(user.addr);

  const handleConnectWallet = (e) => {
    e.preventDefault();
    setActive(!isActive);
    logIn();
  };

  const handleInitializeWallet = (e) => {
    e.preventDefault();
    setActive(!isActive);
    init.initialize(user.addr);
  };

  const handleDepositInit = (e) => {
    if (!loggedIn || isDepositLoading) return;
    e.preventDefault();
    setIsDepositLoading(true);
    setActive(!isActive);
    const walletAddresses = {
      "flow": user.addr,
      "fusd": user.addr
    };
    axios.post(process.env.REACT_APP_API_URL + "/v1/moonpay/url/sign", {
      originalUrl: `https://buy-sandbox.moonpay.com/?apiKey=pk_test_HujosrJl5vx5M0M043cTD0qfgioJobiM&defaultCurrencyCode=flow&walletAddresses=${encodeURIComponent(JSON.stringify(walletAddresses))}&showOnlyCurrencies=flow%2Cfusd`
    })
      .then(response => {
        window.open(response.data.urlWithSignature, "deposit", "width=600,height=700");
      })
      .catch(error => {
        console.log(error);
      })
      .then(() => setIsDepositLoading(false));
  };

  const handleLogout = (e) => {
    e.preventDefault();
    setActive(!isActive);
    logOut();
  };

  const [isActive, setActive] = useState("false");

  const handleToggle = () => {
    setActive(!isActive);
  };

  const closeMenu = () => {
    setActive(!isActive);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    // eslint-disable-next-line
  }, []);

  return (
    <header className="">
      {init.isInitialized === true ? (
        <div className="top-bar bg-purple py-2 text-center">
          <span className="text-white f3-nav-addr text-[12px] leading-[14px] block">
            Account Connected:&nbsp;{" "}
            {user.addr}
          </span>
        </div>
      ) : (
        <span></span>
      )}

      <nav className="navbar py-6">
        <div className="container max-w-full px-4 m-auto w-1232">
          <div className="flex items-center justify-between header-info">
            <div className="site-logo">
              <Link to="/" className="">
                <Logo />
              </Link>
            </div>
            <div className="block blue lg:hidden">
              <Link
                to="#"
                onClick={handleToggle}
                className="text-white res-button text-30px"
              >
                <Menuicon />
              </Link>
            </div>

            <div
              className={`bg-primary lg:bg-transparent navbar-info mobile_menu lg:relative ${isActive ? "" : "menu_active"
                }`}
            >
              <div className="flex items-center justify-between header-info lg:hidden">
                <div className="site-logo">
                  <Link to="/" className="">
                    <Logo />
                  </Link>
                </div>
                <div className="blue">
                  <Link
                    to="#"
                    onClick={handleToggle}
                    className="text-white res-button text-30px"
                  >
                    <Closeicon />
                  </Link>
                </div>
              </div>
              <ul className="mlist navbar-list flex flex-col justify-center lg:h-[auto] lg:block ">
                <li className="nav-menu inline-block text-[24px] leading-[25px] sm:text-base sm:leading-19 mb-[24px] lg:mb-[0px] font-normal">
                  <Link
                    onClick={closeMenu}
                    className="block nav-link text-secondary"
                    to="/"
                  >
                    Home
                  </Link>
                </li>
                <li className="nav-menu inline-block text-[24px] leading-[25px] sm:text-base sm:leading-19 font-normal ml-0 mb-[24px] lg:mb-[0px] lg:ml-9">
                  <a
                    onClick={closeMenu}
                    className="block nav-link text-secondary"
                    href="https://sportscast.net/about/"
                  >
                    About
                  </a>
                </li>
                <li className="nav-menu inline-block text-[24px] leading-[25px] sm:text-base sm:leading-19 font-normal  ml-0 mb-[24px] lg:mb-[0px] lg:ml-9">
                  <Link
                    onClick={closeMenu}
                    className="block nav-link text-secondary"
                    to="/"
                  >
                    Storefront
                  </Link>
                </li>
                {loggedIn && (
                  <li className="nav-menu inline-block text-[24px] leading-[25px] sm:text-base sm:leading-19 font-normal  ml-0 mb-[24px] lg:mb-[0px] lg:ml-9">
                    <span>
                    <Link
                      onClick={handleDepositInit}
                      className="block nav-link text-secondary"
                      to="#"
                    >
                      DEPOSIT
                      {isDepositLoading && (
                      <Loader
                        type="Puff"
                        color="rgb(144 44 242)"
                        height={20}
                        width={20}
                        className="nav-loader"
                        ariaLabel='loading'
                      />
                    )}
                    </Link>
                    </span>
                  </li>
                )}
                <li className="nav-menu inline-block text-[24px] leading-[25px] sm:text-base sm:leading-19 font-normal  ml-0 mb-[24px] lg:mb-[0px] lg:ml-9">
                  <Link
                    onClick={closeMenu}
                    className="block nav-link text-secondary"
                    to="/mywallet"
                  >
                    My Wallet
                  </Link>
                </li>

                <li className="nav-menu inline-block text-[24px] leading-[25px] sm:text-base sm:leading-19 font-normal  ml-0  mb-[24px] lg:mb-[0px] lg:ml-9">
                  <Link
                    onClick={closeMenu}
                    className="block nav-link text-secondary"
                    to="/marketplace"
                  >
                    Marketplace
                  </Link>
                </li>
                <li className="nav-menu inline-block text-[24px] leading-[25px] sm:text-base sm:leading-19 font-normal  ml-0  mb-[24px] lg:mb-[0px] lg:ml-9">
                  <a
                    onClick={closeMenu}
                    className="block nav-link text-secondary"
                    href="https://sportscast.net/contact/"
                  >
                    Contact
                  </a>
                </li>

                {loggedIn ? (
                  <li className="inline-block text-base font-normal nav-menu leading-19">
                    <ul className="flex flex-col lg:block">
                      {init.isInitialized === true ? (
                        <span></span>
                      ) : (
                        <li className="nav-menu inline-block text-[24px] leading-[25px] sm:text-base sm:leading-19 font-normal ml-0  mb-[24px] lg:mb-[0px] lg:ml-26px">
                          <Link
                            className="nav-link text-white py-3.5 px-7 block rounded-2.25rem bg-gradient-to-r from-blue to-purple hover:bg-gradient-to-l ease-in duration-300"
                            to="#"
                            onClick={
                              handleInitializeWallet
                            }
                          >
                            Initialize Wallet
                          </Link>
                        </li>
                      )}
                      <li className="nav-menu inline-block text-[24px] leading-[25px] sm:text-base sm:leading-19 font-normal ml-0  mb-[24px] lg:mb-[0px] lg:ml-26px">
                        <Link
                          className="nav-link text-white py-3.5 px-7 block rounded-2.25rem bg-gradient-to-r from-blue to-purple hover:bg-gradient-to-l ease-in duration-300"
                          to="#"
                          onClick={handleLogout}
                        >
                          Sign out
                        </Link>
                      </li>
                    </ul>
                  </li>
                ) : (
                  <li className="nav-menu inline-block text-[24px] leading-[25px] sm:text-base sm:leading-19 font-normal ml-0  mb-[24px] lg:mb-[0px] lg:ml-26px">
                    <Link
                      className="nav-link text-white py-3.5 px-7 block rounded-2.25rem bg-gradient-to-r from-blue to-purple hover:bg-gradient-to-l ease-in duration-300"
                      to="#"
                      onClick={handleConnectWallet}
                    >
                      Connect Wallet
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
