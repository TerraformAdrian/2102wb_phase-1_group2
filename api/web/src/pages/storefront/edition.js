import { useState, Suspense, useEffect } from "react";
import { useParams } from "react-router";
import { useAccountItem } from "../../hooks/use-account-item.hook";
import { useAccountItems } from "../../hooks/use-account-items.hook";
import { useEditionList } from "../../hooks/use-edition-list.hook";
import { useSeriesItem } from "../../hooks/use-series-item.hook";
import { useSetList } from "../../hooks/use-set-list.hook";
import { SeriesEntryHeader } from "../series/entryHeader";
import { Link } from "react-router-dom";

export function Item({ meta }) {
    return (
        <div className="group transition-all px-3 py-6 border border-solid sa_series_nft_card_wrapper md:p-6 border-purply-blue rounded-16 hover:border-purple hover:bg-blue-dark">
            <div className="sa_series_nft_card_details">
                <img src={meta.image} alt={meta.name} className="w-full" />
            </div>
            <div className="pt-6 sa_nft_info ">
                <div className="sa_nft_inner_info ">
                    <p className="mb-2 text-xs not-italic font-normal text-white uppercase sa_nft_content leading-14">
                        Limited Edition of 5000
                        <span className="float-right">Price</span>
                    </p>
                    <Link
                        to={"/editions/" + meta.id}
                        className="block mb-4 text-lg not-italic font-medium text-white capitalize  sa_nft_title leading-24 font-oswald"
                    >
                        {meta.seriesname} - {meta.name} Edition
                        <span className="float-right">$50</span>
                    </Link>
                    <p className="text-base not-italic font-normal sa_nft_text text-blue-light leading-24 min-h-48">
                        The early years.
                    </p>
                    <Link
                        to={"/editions/" + meta.id}
                        className="group-hover:bg-purple transition-all text-white text-sm leading-4 font-normal not-italic capitalize py-3.5 block border border-solid border-purple rounded-2.25rem text-center mt-6"
                    >
                        Buy Now
                    </Link>
                </div>
            </div>
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
    const { id } = useParams();

    const { series } = useSeriesItem(id);

    const { sets } = useSetList(id);

    const getList = () => {
        var res = [];

        for (const prop in sets) {
            var data = sets[prop];

            var parameter = { ...data, seriesname: series.name };

            res.push(<WrappedItem meta={parameter} />);
        }

        return res;
    };

    return (
        <div className="">
            <SeriesEntryHeader data={series} />

            <div class="sa_series_indiv_producr_tes_section pb-50px md:pb-10 md:pt-5">
                <div class="container w-1232 m-auto px-4 max-w-full">
                    <div class="sa_series_nft_card grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-30px ">
                        {getList()}
                    </div>
                </div>
            </div>
        </div>
    );
}
