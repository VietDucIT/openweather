import { Fragment, useCallback, useEffect, useState } from 'react';
import { Accordion, ListGroup } from 'react-bootstrap';
import { Link } from "react-router-dom";

import Loader from '../Loader';

import getWeatherByCoord from '../../services/getAPIByCoord';
import getTopRain from '../../helpers/getTopRain';
import getTopSunrise from '../../helpers/getTopSunrise';
import getTopTemperature from '../../helpers/getTopTemperature';
import getTopWind from '../../helpers/getTopWind';
import getDayTime from '../../helpers/getDayTime';

import city from '../../json/city';

import './TopList.css';
import styles from './TopList.module.css';

const TopList = () => {
    const [isLoading, setLoading] = useState(false);

    const [fullData, setFullData] = useState(null);
    const [topRain, setTopRain] = useState(null);
    const [topSunrise, setTopSunrise] = useState(null);
    const [topTemperature, setTopTemperature] = useState(null);
    const [topWind, setTopWind] = useState(null);

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

                const wind = await getTopWind(fullData);
                console.log("Top wind:", wind);
                setTopWind(wind);

                setLoading(false);
            } catch (err) {
                console.log("Error while getting top list", err);
            }
        }
    , [fullData]);

    useEffect(() => {
        getTopList();
    }, [ getTopList ]);

    const { getTimeFromTimestamp } = getDayTime();

    return (
        <Fragment>
        { !topTemperature && (
            <div className={`${styles.box} position-relative`}>
                {isLoading && <Loader/>}
            </div>
        )}

        { topTemperature && <Fragment>
            <div className={`${styles.box} toplist`}>
                <Accordion>
                    {/* Top rainfall */}
                    <Accordion.Item
                        eventKey="0"
                        className="border-0 border-bottom bg-transparent"
                    >
                        <Accordion.Header>
                            <span> 
                                <i className="bi bi-cloud-drizzle" /> &nbsp;
                                Top 5 provinces with the most rainfall
                            </span>
                            <i className="ms-4 bi bi-chevron-down" />
                        </Accordion.Header>

                        <Accordion.Body>
                            <ListGroup variant="flush">
                                { topRain && topRain.map((item, index) => (
                                    <ListGroup.Item 
                                        key={index}
                                        className="bg-transparent p-0"
                                    >
                                        <Link
                                            to={`/detail?city=${item.main.param ? item.main.param : item.main.name}`}
                                            className="d-flex justify-content-between text-decoration-none text-light p-2"
                                        >
                                            <span>{item.main.name}</span>
                                            <span>{Math.round(item.rain)}mm</span>
                                        </Link>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        </Accordion.Body>
                    </Accordion.Item>

                    {/* Top sunrise */}
                    <Accordion.Item
                        eventKey="1"
                        className="border-0 border-bottom bg-transparent"
                    >
                        <Accordion.Header>
                            <span>
                                <i className="bi bi-sunrise" />  &nbsp;
                                Top 5 provinces with the earliest sunrise
                            </span>
                            <i className="ms-4 bi bi-chevron-down" />
                        </Accordion.Header>

                        <Accordion.Body>
                            <ListGroup variant="flush">
                                { topSunrise  && topSunrise.map((item, index) => (
                                    <ListGroup.Item 
                                        key={index}
                                        className="bg-transparent p-0"
                                    >
                                        <Link
                                            to={`/detail?city=${item.main.param ? item.main.param : item.main.name}`}
                                            className="d-flex justify-content-between text-decoration-none text-light p-2"
                                        >
                                            <span>{item.main.name}</span>
                                            <span>{getTimeFromTimestamp(item.sunrise, 25200)}</span>
                                            {/* Due to just get list of Vietnamese cities, set timezome_offset = 25200 */}
                                        </Link>
                                    </ListGroup.Item>
                                )) }
                            </ListGroup>
                        </Accordion.Body>
                    </Accordion.Item>

                    {/* Top temperature */}
                    <Accordion.Item
                        eventKey="2"
                        className="border-0 border-bottom bg-transparent"
                    >
                        <Accordion.Header>
                            <span>
                                <i className="bi bi-thermometer-low" /> &nbsp;
                                Top 5 provinces with the lowest temperature
                            </span>
                            <i className="ms-4 bi bi-chevron-down" />
                        </Accordion.Header>

                        <Accordion.Body>
                            <ListGroup variant="flush">
                                { topTemperature && topTemperature.map((item, index) => (
                                    <ListGroup.Item 
                                        key={index}
                                        className="bg-transparent p-0"
                                    >
                                        <Link
                                            to={`/detail?city=${item.main.param ? item.main.param : item.main.name}`}
                                            className="d-flex justify-content-between text-decoration-none text-light p-2"
                                        >
                                            <span>{item.main.name}</span>
                                            <span>{Math.round(item.temp.day - 273.15)}°C</span>
                                        </Link>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        </Accordion.Body>
                    </Accordion.Item>

                    {/* Top wind */}
                    <Accordion.Item
                        eventKey="3"
                        className="border-0 border-bottom bg-transparent"
                    >
                        <Accordion.Header>
                            <span>
                                <i className="bi bi-wind" /> &nbsp;
                                Top 5 provinces with the fastest wind speed
                            </span>
                            <i className="ms-4 bi bi-chevron-down" />
                        </Accordion.Header>

                        <Accordion.Body>
                            <ListGroup variant="flush">
                                { topWind && topWind.map((item, index) => (
                                    <ListGroup.Item 
                                        key={index}
                                        className="bg-transparent p-0"
                                    >
                                        <Link
                                            to={`/detail?city=${item.main.param ? item.main.param : item.main.name}`}
                                            className="d-flex justify-content-between text-decoration-none text-light p-2"
                                        >
                                            <span>{item.main.name}</span>
                                            <span>{item.wind_speed}m/s</span>
                                        </Link>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </div>
        </Fragment>}
        </Fragment>
    )
};

export default TopList;