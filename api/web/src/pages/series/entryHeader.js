export function SeriesEntryHeader(props) {
    return (
        <div class="sa_series_indiv_section pt-50px md:pt-20 pb-10">
            <div class="container w-1232 m-auto px-4 max-w-full">
                <div class="sa_series_indiv_details md:flex md:justify-between">
                    <h1 class="sa_series_title md:w-585 max-w-full text-white capitalize not-italic font-oswald text-24px mb-4 md:mb-0 md:text-30px lg:text-48px leading-29 md:leading-36 lg:leading-58 font-semibold ">
                        {props.data.name} Series - Current Editions
                    </h1>
                    <div class="sa_series_content md:w-550  max-w-full text-secondary text-base leading-24 font-normal not-italic space-y-4 md:space-y-6 lg:pl-68px">
                        <p>
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
