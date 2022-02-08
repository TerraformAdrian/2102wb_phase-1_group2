import { Link } from "react-router-dom";
import PurchasePlaceholder from "../../assets/images/purchse_placeholder.jpg";

export function Success() {
    return (
        <div className="sc_series_pur_section py-50px md:pt-100px md:pb-[142px] ">
            <div className="container max-w-full px-4 m-auto w-1232">
                <div className="max-w-full m-auto sc_series_pur_wrapper w-585">
                    <div className="sc_series_pur_img">
                        <img
                            src={PurchasePlaceholder}
                            alt="Purchese"
                            className="m-auto rounded-[8px]"
                        />
                    </div>
                    <div className="mt-6 sc_Series_content">
                        <div className="flex items-center justify-center">
                            <span className="order_status text-[#ECEBFE] align-middle inline-block text-[14px] leading-[14px] font-normal not-italic tracking-widest uppercase my-3px text-center">
                                Order Status
                            </span>
                            <span className="status_ingo text-[10px] leading-[12px] uppercase text-[#ECEBFE] font-normal not-italic py-1 px-2.5 bg-purple rounded-[30px] inline-block border-0.5 border-solid border-purple text-center ml-2">
                                pending
                            </span>
                        </div>
                        <h2 className="mt-2 mb-6 not-italic font-semibold text-center text-white capitalize sa_series_title font-oswald text-24px md:mb-6 md:text-30px lg:text-48px leading-29 md:leading-36 lg:leading-58 ">
                            We're processing your order.
                        </h2>
                        {/* <p className="px-0 mb-6 text-base not-italic font-normal text-center sc_series_pur_content text-secondary leading-24 md:px-52px ">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Accumsan tempor mi et nunc non dolor nulla.{" "}
                        </p> */}
                        <Link
                            to="#"
                            className="transection text-secondary text-base leading-[16px] font-semibold not-italic text-center underline uppercase block tracking-widest "
                        >
                            View transection
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
