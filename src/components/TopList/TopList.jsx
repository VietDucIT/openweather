import { Fragment, useCallback, useEffect, useState } from 'react';
import { Link } from "react-router-dom";

import Loader from '../Loader';
import Error from '../Error';

import getWeatherByCoord from '../../services/getAPIByCoord';
import getTopRain from '../../helpers/getTopRain';
import getTopSunrise from '../../helpers/getTopSunrise';
import getTopTemperature from '../../helpers/getTopTemperature';
import getDayTime from '../../helpers/getDayTime';
import city from '../../json/city';

import './TopList.css';
import styles from './TopList.module.css';

const TopList = () => {
    const [isLoading, setLoading] = useState(false);
    const [hasError, setError] = useState(false);

    const [fullData, setFullData] = useState(null);
    const [topRain, setTopRain] = useState(null);
    const [topSunrise, setTopSunrise] = useState(null);
    const [topTemperature, setTopTemperature] = useState(null);

    // Somecode change here

    const getAPI = useCallback (
        async () => {
            try {
                setLoading(true);
                const data = [];
                for(let i=0; i<city.length; i++){
                    const lon = city[i].coord.lon;
                    const lat = city[i].coord.lat;
                    data[i] = await getWeatherByCoord( lon, lat );
                }
                console.log("From TopList.js: Data", data);
                setFullData(data);
                setLoading(false);
            } catch (err) {
                setError(true);
                console.log("Can't get API by coord");
            }
        }
    , []);

    useEffect(() => {
        getAPI();
    }, [getAPI]);

    const getTopList = useCallback (
        async () => {
            try {
                setLoading(true);
                const rain = await getTopRain(fullData);
                console.log("Top rain:", rain);
                setTopRain(rain);
                const sunrise = await getTopSunrise(fullData);
                console.log("Top sunrise:", sunrise);
                setTopSunrise(sunrise);
                const temp = await getTopTemperature(fullData);
                console.log("Top temp:", temp);
                setTopTemperature(temp);
                setLoading(false);
            } catch (err) {
                setError(true);
                console.log("Error while getting top list");
            }
        }
    , [fullData]);

    useEffect(() => {
        getTopList();
    }, [getTopList]);

    const {getTimeFromTimestamp} = getDayTime();

    console.log(isLoading, "&&&", hasError);

    return (
        <Fragment>
        { !topTemperature && (
            <div className={`${styles.box} position-relative`}>
                {isLoading && <Loader/>}
                {hasError && <Error message={"Has Error"}/>}
            </div>
        )}
        { topTemperature && <Fragment>
            <div className={`${styles.box} toplist`}>
                <ul className={`nav nav-tabs ${styles['nav-tabs']} flex-column my-5`}>
                    <li className={`nav-item ${styles['nav-item']} dropdown`}>
                        <div className={`nav-link ${styles['nav-link']} dropdown-toggle ${styles['dropdown-toggle']} d-flex justify-content-between`} data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                            <span className="mr-5">Top 5 provinces with the most rainfall</span>
                            <i className="bi bi-chevron-down"></i>
                        </div>

                        <div className="dropdown-menu">
                            { topRain.map((item, index) => (
                                <Fragment key={index}>
                                    <Link className="dropdown-item d-flex justify-content-between" to={`/detail?city=${item.main.param ? item.main.param : item.main.name}`}>
                                        <span>{item.main.name}</span>
                                        <span>{Math.round(item.rain)}mm</span>
                                    </Link>
                                    <div className={`dropdown-divider ${styles['dropdown-divider']}`}></div>
                                </Fragment>
                            ))}
                        </div>
                    </li>

                    <li className={`nav-item ${styles['nav-item']} dropdown`}>
                        <div className={`nav-link ${styles['nav-link']} dropdown-toggle ${styles['dropdown-toggle']} d-flex justify-content-between`} data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                            <span className="mr-5">Top 5 provinces with the earliest sunrise</span>
                            <i className="bi bi-chevron-down"></i>
                        </div>

                        <div className="dropdown-menu">
                            { topSunrise.map((item, index) => (
                                <Fragment key={index}>
                                    <Link className="dropdown-item d-flex justify-content-between" to={`/detail?city=${item.main.param ? item.main.param : item.main.name}`}>
                                        <span>{item.main.name}</span>
                                        <span>{getTimeFromTimestamp(item.sunrise)}</span>
                                    </Link>
                                    <div className={`dropdown-divider ${styles['dropdown-divider']}`}></div>
                                </Fragment>
                            ))}
                        </div>
                    </li>

                    <li className={`nav-item ${styles['nav-item']} dropdown`}>
                        <div className={`nav-link ${styles['nav-link']} dropdown-toggle ${styles['dropdown-toggle']} d-flex justify-content-between`} data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                            <span className="mr-5">Top 5 provinces with the lowest temperature</span>
                            <i className="bi bi-chevron-down"></i>
                        </div>

                        <div className="dropdown-menu">
                            { topTemperature.map((item, index) => (
                                <Fragment key={index}>
                                    <Link className="dropdown-item d-flex justify-content-between" to={`/detail?city=${item.main.param ? item.main.param : item.main.name}`}>
                                        <span>{item.main.name}</span>
                                        <span>{Math.round(item.temp.day - 273.15)}°C</span>
                                    </Link>
                                    <div className={`dropdown-divider ${styles['dropdown-divider']}`}></div>
                                </Fragment>
                            ))}
                        </div>
                    </li>
                </ul>
            </div>

            <button className={`${styles.button} position-absolute mt-3`}>
                <Link className='font-weight-bold text-light' to="/">Go Home</Link>
            </button>
        </Fragment>}
        </Fragment>
    )
};

export default TopList;

// Change here

    /* const getAPI = useCallback (
        async () => {
            try {
                setLoading(true);
                const data = [];
                for(let i=0; i<city.length; i++){
                    const lon = city[i].coord.lon;
                    const lat = city[i].coord.lat;
                    data[i] = await getWeatherByCoord( lon, lat );
                }
                // console.log("From TopList.js: Data", data);
                setFullData(data);
                
                try {
                    const rain = await getTopRain(fullData);
                    // console.log("Top rain:", rain);
                    setTopRain(rain);
                    const sunrise = await getTopSunrise(fullData);
                    // console.log("Top sunrise:", sunrise);
                    setTopSunrise(sunrise);
                    const temp = await getTopTemperature(fullData);
                    // console.log("Top temp:", temp);
                    setTopTemperature(temp);
                    setLoading(false);
                } catch (err) {
                    setError(true);
                    // console.log("Error while getting top list");
                }

                setLoading(false);
            } catch (err) {
                setError(true);
                // console.log("Can't get API by coord");
            }
        }
    , [fullData]);

    useEffect(() => {
        getAPI();
    }, [getAPI]);

    const {getTimeFromTimestamp} = getDayTime();

    console.log(isLoading, "&&&", hasError);    */