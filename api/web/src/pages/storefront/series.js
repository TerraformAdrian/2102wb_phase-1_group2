import { Suspense } from "react";
import { useSeriesList } from "../../hooks/use-series-list.hook";

import { Link } from "react-router-dom";
import { EntryHeader } from "./front/entryheader";

export function Item({ meta }) {
    return (
        <div>
            <Link
                to={"/series/" + meta.id}
                className="flex flex-col justify-between h-full p-3 transition-all border border-solid sa_series_tes_details md:p-6 hover:bg-blue-dark border-purple rounded-8 md:rounded-16"
            >
                <img
                    src={meta.image}
                    alt="Zeb Noland"
                    className="w-full max-w-full"
                />
                <Link
                    to={"/series/" + meta.id}
                    className="block mt-4 text-base not-italic font-normal text-center text-white capitalize sa_series_tes_title md:mt-6 md:text-20px leading-19 md:leading-24 font-oswald"
                >
                    {meta.name}
                </Link>
            </Link>
        </div>
    );
}

export function WrappedItem(props) {
    return (
        <Suspense fallback={null}>
            <Item {...props} />
        </Suspense>
    );
}

export function Page() {
    const { series } = useSeriesList(true);

    const getList = () => {
        var res = [];

        for (const prop in series) {
            res.push(<WrappedItem meta={series[prop]} />);
        }

        return res;
    };

    return (
        <div className="">
            <EntryHeader />
            <div className="sa_series_testimonial pb-9">
                <div className="container max-w-full px-4 m-auto w-1232">
                    <div className="grid grid-cols-2 gap-4 sa_series_tes_wrapper md:grid-cols-3 lg:grid-cols-4 gap-y-4 md:gap-y-6 xl:gap-30px">
                        {getList()}
                    </div>
                </div>
            </div>
        </div>
    );
}
