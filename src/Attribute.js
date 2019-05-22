import React from 'react';

export const Attribute = ({ label, value }) => {
    return (
        <p className="attribute">
            <strong>{label}:</strong> {value}
        </p>
    );
};
