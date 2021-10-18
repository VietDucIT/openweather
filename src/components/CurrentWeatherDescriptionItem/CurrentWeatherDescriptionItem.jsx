import React from 'react';
import PropTypes from 'prop-types';

const CurrentWeatherDescriptionItem = ({ name, value, unit }) => (
    <div className="d-flex justify-content-between">
        <p className="mb-0 font-weight-bolder text-uppercase">{name}</p>
        <p className="mb-0"> {value} {unit}</p>
    </div>
);

CurrentWeatherDescriptionItem.propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    unit: PropTypes.string.isRequired
};

export default CurrentWeatherDescriptionItem;
