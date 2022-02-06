import heroBg from "../../assets/images/hero_banner_cs.png";
import { ReactComponent as CsEllipse } from "../../assets/images/cs_ellipse.svg";

export function MarketPlace() {
    return (
        <div
            className="flex py-50px md:pt-157px md:pb-312px  bg-cover bg-fixed bg-center relative z-1 before:content  before:absolute before:top-0 before:left-0 before:right-0 before:bottom-0 before:-z-1 before:bg-cover before:bg-no-repeat mp_cs content-center mt-[-108px] -z-50"
            style={{ backgroundImage: `url(${heroBg})` }}
        >
            <div className="container max-w-full px-4 m-auto w-1232 ">
                <div className="sc_series_cs_details">
                    <span className="flex justify-center mb-[32px]">
                        <CsEllipse className=" w-[150px]  md:w-[170px] lg:w-[200px] h-[150px]  md:h-[170px] lg:h-[200px]" />
                    </span>
                    <div className="max-w-full m-auto space-y-4 sc_series_coming_info md:space-y-5 lg:space-y-22px w-585">
                        <h2 className="not-italic font-semibold text-center text-white uppercase cs_title text-24px leading-29 md:text-30px md:leading-36 lg:text-48px lg:leading-58 xl:text-64px xl:leading-60 font-oswald">
                            Market Place
                        </h2>
                        <p className="coming_soon text-bg-822FF4 text-20px leading-24 md:text-28px md:leading-34 lg:text-4xl uppercase not-italic font-semibold text-center lg:leading-37 text-[#822FF4]">
                            coming soon
                        </p>
                        <p className="text-base not-italic font-normal text-center sc_series_cs_content text-secondary leading-24 md:px-26px">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Accumsan tempor mi et nunc non dolor nulla.
                            Amet porttitor sed aliquam, dictum magna pretium.
                            Amet ut ut justo scelerisque aliquam, velit.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
