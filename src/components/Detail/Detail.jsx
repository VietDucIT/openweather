import React, { Fragment, useEffect, useCallback, useState } from 'react';
import queryString from 'query-string';
import { useLocation } from 'react-router';

import Loader from '../Loader';
import Current from '../Current';
import Error from '../Error';
import getWeather from '../../services/api';

import styles from './Detail.module.css';

const Detail = () => {
    const location = useLocation();
    const { city } = queryString.parse(location.search);

    const [currentWeather, setCurrentWeather] = useState({});
    const [isLoading, setLoading] = useState(false);
    const [hasError, setError] = useState(false);

    const getWeatherCallback = useCallback(
        async () => {
            console.log("await");
            try {
                setLoading(true);
                const weather = await getWeather(city);
                console.log("weather", weather);
                setCurrentWeather(weather.current);
                setLoading(false);
            } catch (err) {
                setError(true);
            }
        }
    , [city]);

    useEffect(() => {
        getWeatherCallback();
    }, [getWeatherCallback]);

    return (
        <Fragment>
            { !currentWeather && (
                <div className={`${styles.box} position-relative`}>
                    {isLoading && <Loader/>}
                    {hasError && <Error message={hasError}/>}
                </div>
            )}
            {currentWeather && <Current current={currentWeather} city={city}/>}
        </Fragment>
    );
};

export default Detail;
