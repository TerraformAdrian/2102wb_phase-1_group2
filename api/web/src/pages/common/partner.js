import flow from "../../assets/images/flow.svg";
import moonplay from "../../assets/images/moonplay.svg";
import ikonic from "../../assets/images/ikonic.svg";
import terraform from "../../assets/images/terraform.svg";

export function Partners() {
    return (
        <div className="sc_series_logo_section py-50px md:py-66px border-t-[1px] border-b-[1px] border-solid border-white border-opacity-25">
            <div className="container max-w-full px-4 m-auto w-1232">
                <div className="sc_series_logo_wrapper lg:flex lg:justify-between lg:items-center ">
                    <div className="sc_series_logo_title w-187px ">
                        <h3 className="text-2xl not-italic font-semibold text-white capitalize leading-29 font-oswald">
                            In Partnership With IKONICC
                        </h3>
                    </div>
                    <div className="flex flex-wrap sc_series_logo mt-5 lg:mt-0 space-x-[30px] md:space-x-[30px] lg:space-x-[60px]">
                        <div>
                            <img src={flow} alt="flow" className="w-[85%] sm:w-[auto]" />
                        </div>
                        <div>
                            <img src={moonplay} alt="moonplay" className="w-[85%] sm:w-[auto]" />
                        </div>
                        <div  className=" !ml-0 sm:!ml-[30px]">
                            <img src={ikonic} alt="ikonic" className="mt-3 sm:mt-[0px] w-[85%] sm:w-[auto]" />
                        </div>
                        <div>
                            <img src={terraform} alt="terraform" className="mt-3 sm:mt-[0px] w-[85%] sm:w-[auto]" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
