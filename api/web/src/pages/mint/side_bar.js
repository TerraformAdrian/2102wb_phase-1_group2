import React, { useState, useEffect } from "react";
import { ReactComponent as Logo } from "../../assets/images/logo.svg";
import { ReactComponent as Menuicon } from "../../assets/images/menu_white.svg";
import { ReactComponent as Closeicon } from "../../assets/images/close_white.svg";
import { Link } from "react-router-dom";
import "../../index.css";

export function SideBar() {
    const [isActive, setActive] = useState("false");

    const handleToggle = () => {
        setActive(!isActive);
    };

    const closeMenu = () => {
        setActive(!isActive);
    };

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);

    return (
        <header className="">
            <nav className="navbar py-6">
                <div className="container max-w-full px-4 m-auto w-1232">
                    <div className="flex items-center justify-between header-info">
                        <div className="site-logo">
                            <Link to="/mintpanel" className="">
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
                                        to="/mintpanel/collections"
                                    >
                                        Series
                                    </Link>
                                </li>
                                <li className="nav-menu inline-block text-[24px] leading-[25px] sm:text-base sm:leading-19 font-normal ml-0 mb-[24px] lg:mb-[0px] lg:ml-9">
                                    <Link
                                        onClick={closeMenu}
                                        className="block nav-link text-secondary"
                                        to="/mintpanel/mintnft"
                                    >
                                        Mint NFTs
                                    </Link>
                                </li>
                                <li className="nav-menu inline-block text-[24px] leading-[25px] sm:text-base sm:leading-19 font-normal  ml-0 mb-[24px] lg:mb-[0px] lg:ml-9">
                                    <Link
                                        onClick={closeMenu}
                                        className="block nav-link text-secondary"
                                        to="/mintpanel/assets"
                                    >
                                        Assets
                                    </Link>
                                </li>
                                <li className="nav-menu inline-block text-[24px] leading-[25px] sm:text-base sm:leading-19 font-normal  ml-0 mb-[24px] lg:mb-[0px] lg:ml-9">
                                    <Link
                                        onClick={closeMenu}
                                        className="block nav-link text-secondary"
                                        to="/mintpanel/settings"
                                    >
                                        Settings
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
}
