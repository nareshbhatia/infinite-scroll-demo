import React from 'react';
import numeral from 'numeral';

function formatWithSign(value) {
    return numeral(value).format('+0.[0000]');
}

function formatWithAbbreviation(value) {
    return numeral(value).format('0a');
}

export const CompanyProfileRow = ({ profile }) => {
    const {
        ticker,
        name,
        beta,
        ceo,
        industry,
        lastDividend,
        marketCap,
        price,
        priceChange,
        priceChangePercent,
        priceRange52Week,
        sector,
        volumeAverage
    } = profile;

    return (
        <tr>
            <td>{ticker}</td>
            <td>{name}</td>
            <td>{sector}</td>
            <td>{industry}</td>
            <td>{ceo}</td>
            <td>{formatWithAbbreviation(marketCap)}</td>
            <td>{price}</td>
            <td>{priceChange}</td>
            <td>{formatWithSign(priceChangePercent)}</td>
            <td>{beta}</td>
            <td>{priceRange52Week}</td>
            <td>{formatWithAbbreviation(volumeAverage)}</td>
            <td>{lastDividend}</td>
        </tr>
    );
};
