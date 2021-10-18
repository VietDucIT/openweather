import React from 'react';
import PropTypes from 'prop-types';

import CurrentWeatherDescriptionItem from '../CurrentWeatherDescriptionItem';

const CurrentWeatherDescription = ({ forecast }) => (
    <div className="mt-4 mt-md-2">
        <div className="d-flex flex-column mb-2">
            {forecast.map(item => (
                <CurrentWeatherDescriptionItem {...item} key={item.name}/>
            ))}
        </div>
    </div>
);

CurrentWeatherDescription.propTypes = {
    forecast: PropTypes.array
}

export default CurrentWeatherDescription;
