import { Fragment, useCallback, useEffect, useState } from 'react';
import { Link } from "react-router-dom";

import getWeatherByCoord from '../../services/getAPIByCoord';
import getTopRain from '../../helpers/getTopRain';
import getTopSunrise from '../../helpers/getTopSunrise';
import getTopTemperature from '../../helpers/getTopTemperature';
import city from '../../json/city';

import './TopList.css';
import styles from './TopList.module.css';

const TopList = () => {
    const [fullData, setFullData] = useState([])

    const getAPI = useCallback (
        async () => {
            try {
                const data = [];
                for(let i=0; i<city.length; i++){
                    const lon = city[i].coord.lon;
                    const lat = city[i].coord.lat;
                    data[i] = await getWeatherByCoord( lon, lat );
                }
                console.log("From TopList.js: Data", data);
                setFullData(data);
            } catch (err) {
                console.log("Can't get API by coord");
            }
        }
    , []);

    useEffect(() => {
        getAPI();
    }, [getAPI]);

    const [topRain, setTopRain] = useState([])
    const [topSunrise, setTopSunrise] = useState([])
    const [topTemperature, setTopTemperature] = useState([])

    const getTopList = useCallback (
        async () => {
            try {
                const rain = await getTopRain(fullData);
                console.log("Top rain:", rain);
                setTopRain(rain);
                const sunrise = await getTopSunrise(fullData);
                console.log("Top sunrise:", sunrise);
                setTopSunrise(sunrise);
                const temp = await getTopTemperature(fullData);
                console.log("Top temp:", temp);
                setTopTemperature(temp);
            } catch (err) {
                console.log("Error while getting top list");
            }
        }
    , [fullData]);

    useEffect(() => {
        getTopList();
    }, [getTopList]);

    return (
        <Fragment>
        <div className={`${styles.box} toplist`}>
            <ul className={`nav nav-tabs ${styles['nav-tabs']} flex-column my-5`}>
                <li className={`nav-item ${styles['nav-item']} dropdown`}>
                    <div className={`nav-link ${styles['nav-link']} dropdown-toggle ${styles['dropdown-toggle']} d-flex justify-content-between`} data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                        <span className="mr-5">Top 10 provinces with the most rainfall</span>
                        <i className="bi bi-chevron-down"></i>
                    </div>

                    <div className="dropdown-menu">
                        { topRain.map((item, index) => (
                            <Fragment key={index}>
                                <Link className="dropdown-item" to={`/detail?city=${item.main.param ? item.main.param : item.main.name}`}>{item.main.name}</Link>
                                <div className={`dropdown-divider ${styles['dropdown-divider']}`}></div>
                            </Fragment>
                        ))}
                    </div>
                </li>

                <li className={`nav-item ${styles['nav-item']} dropdown`}>
                    <div className={`nav-link ${styles['nav-link']} dropdown-toggle ${styles['dropdown-toggle']} d-flex justify-content-between`} data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                        <span className="mr-5">Top 10 provinces with the earliest sunrise</span>
                        <i className="bi bi-chevron-down"></i>
                    </div>

                    <div className="dropdown-menu">
                        { topSunrise.map((item, index) => (
                            <Fragment key={index}>
                                <Link className="dropdown-item" to={`/detail?city=${item.main.param ? item.main.param : item.main.name}`}>{item.main.name}</Link>
                                <div className={`dropdown-divider ${styles['dropdown-divider']}`}></div>
                            </Fragment>
                        ))}
                    </div>
                </li>

                <li className={`nav-item ${styles['nav-item']} dropdown`}>
                    <div className={`nav-link ${styles['nav-link']} dropdown-toggle ${styles['dropdown-toggle']} d-flex justify-content-between`} data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                        <span className="mr-5">Top 10 provinces with the lowest temperature</span>
                        <i className="bi bi-chevron-down"></i>
                    </div>

                    <div className="dropdown-menu">
                        { topTemperature.map((item, index) => (
                            <Fragment key={index}>
                                <Link className="dropdown-item" to={`/detail?city=${item.main.param ? item.main.param : item.main.name}`}>{item.main.name}</Link>
                                <div className={`dropdown-divider ${styles['dropdown-divider']}`}></div>
                            </Fragment>
                        ))}
                    </div>
                </li>
            </ul>
        </div>

        <button className={`${styles.button} position-absolute mt-3`}>
            <Link to="/">Go Home</Link>
        </button>
        </Fragment>
    )
};

export default TopList;