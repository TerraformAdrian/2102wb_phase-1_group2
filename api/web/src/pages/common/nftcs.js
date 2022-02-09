import { ReactComponent as FootBall } from "../../assets/images/american_football.svg";
import { ReactComponent as Basketball } from "../../assets/images/basketball.svg";
import { ReactComponent as Baseball } from "../../assets/images/baseball.svg";
import { ReactComponent as Hockey } from "../../assets/images/hockey.svg";

export function NftCommingsoon() {
    return (
        <div className="sa_series_section pt-50px pb-50px md:pt-140px md:pb-100px">
            <div className="container max-w-full px-4 m-auto w-1232">
                <div className="sa_series_details ">
                    <h2 className="max-w-full m-auto mb-4 not-italic font-semibold text-center text-white capitalize w-558 lg:text-40px font-oswald text-20px md:mb-0 md:text-30px leading-29 md:leading-36 lg:leading-58">
                        Additional Podcast NFT Episodes Coming Soon!
                    </h2>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-6 sa_series_producr_tes_wrapper md:grid-cols-3 lg:grid-cols-4 gap-y-4 md:gap-y-6 xl:gap-30px md:mt-10">
                    <div className="sa_series_tes_details transition-all p-4 md:p-6 hover:bg-blue-dark border border-solid border-purply-blue hover:border-purple rounded-8 md:rounded-16 min-h-[100%] md:min-h-[216px]">
                        <span className="flex w-[50px] h-[50px] md:w-[120px] md:h-[120px] mx-auto justify-center items-center">
                            <FootBall />
                        </span>
                        <h5 className="mt-4 text-base not-italic font-normal text-center text-white capitalize sa_series_tes_title md:mt-6 md:text-20px leading-19 md:leading-24 font-oswald">
                            Football
                        </h5>
                    </div>
                    <div className="sa_series_tes_details transition-all p-4 md:p-6 hover:bg-blue-dark border border-solid border-purply-blue hover:border-purple rounded-8 md:rounded-16 min-h-[100%] md:min-h-[216px]">
                        <span className="flex w-[50px] h-[50px] md:w-[120px] md:h-[120px] mx-auto justify-center items-center">
                            <Basketball />
                        </span>
                        <h5 className="mt-4 text-base not-italic font-normal text-center text-white capitalize sa_series_tes_title md:mt-6 md:text-20px leading-19 md:leading-24 font-oswald">
                            Basketball
                        </h5>
                    </div>
                    <div className="sa_series_tes_details transition-all p-4 md:p-6 hover:bg-blue-dark border border-solid border-purply-blue hover:border-purple rounded-8 md:rounded-16 min-h-[100%]  md:min-h-[216px]">
                        <span className="flex w-[50px] h-[50px] md:w-[120px] md:h-[120px] mx-auto justify-center items-center">
                            <Baseball />
                        </span>
                        <h5 className="mt-4 text-base not-italic font-normal text-center text-white capitalize sa_series_tes_title md:mt-6 md:text-20px leading-19 md:leading-24 font-oswald">
                            Baseball
                        </h5>
                    </div>
                    <div className="sa_series_tes_details transition-all p-4 md:p-6 hover:bg-blue-dark border border-solid border-purply-blue hover:border-purple rounded-8 md:rounded-16 min-h-[100%]  md:min-h-[216px]">
                        <span className="flex w-[50px] h-[50px] md:w-[120px] md:h-[120px] mx-auto justify-center items-center">
                            <Hockey />
                        </span>
                        <h5 className="mt-4 text-base not-italic font-normal text-center text-white capitalize sa_series_tes_title md:mt-6 md:text-20px leading-19 md:leading-24 font-oswald">
                            Hockey
                        </h5>
                    </div>
                </div>
            </div>
        </div>
    );
}
