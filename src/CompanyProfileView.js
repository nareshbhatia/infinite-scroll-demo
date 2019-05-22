import React from 'react';
import numeral from 'numeral';
import { Attribute } from './Attribute';

function formatWithSign(value) {
    return numeral(value).format('+0.[0000]');
}

function formatWithAbbreviation(value) {
    return numeral(value).format('0a');
}

export const CompanyProfileView = ({ profile }) => {
    const {
        ticker,
        name,
        beta,
        ceo,
        description,
        exchange,
        industry,
        lastDividend,
        marketCap,
        price,
        priceChange,
        priceChangePercent,
        priceRange52Week,
        sector,
        volumeAverage,
        website
    } = profile;

    return (
        <div className="profile">
            <h3>
                {name} ({ticker})
            </h3>
            <h4>
                {sector} - {industry}
            </h4>
            <p className="profile__description">{description}</p>
            <Attribute label="CEO" value={ceo} />
            <Attribute label="Exchange" value={exchange} />
            <Attribute
                label="Market cap"
                value={formatWithAbbreviation(marketCap)}
            />
            <Attribute
                label="Price"
                value={`${price}⠀${formatWithSign(
                    priceChange
                )} ${priceChangePercent}`}
            />
            <Attribute label="Beta" value={beta} />
            <Attribute label="52 week range" value={priceRange52Week} />
            <Attribute
                label="Avg. volume"
                value={formatWithAbbreviation(volumeAverage)}
            />
            <Attribute label="Last Dividend" value={lastDividend} />
            <Attribute
                label="Website"
                value={<a href={website}>{website}</a>}
            />
        </div>
    );
};
