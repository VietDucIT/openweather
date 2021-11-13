import { Fragment, useCallback, useEffect, useState } from 'react';
import { Accordion, ListGroup } from 'react-bootstrap';
import { Link } from "react-router-dom";

import Loader from '../Loader';
// import Error from '../Error';

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
    // const [hasError, setError] = useState(false);

    const [fullData, setFullData] = useState(null);
    const [topRain, setTopRain] = useState(null);
    const [topSunrise, setTopSunrise] = useState(null);
    const [topTemperature, setTopTemperature] = useState(null);

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
                // setError(true);
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
                // setError(true);
                console.log("Error while getting top list");
            }
        }
    , [fullData]);

    useEffect(() => {
        getTopList();
    }, [getTopList]);

    const {getTimeFromTimestamp} = getDayTime();

    return (
        <Fragment>
        { !topTemperature && (
            <div className={`${styles.box} position-relative`}>
                {isLoading && <Loader/>}
                {/* {hasError && <Error message={"Has Error"}/>} */}
            </div>
        )}

        { topTemperature && <Fragment>
            <div className={`${styles.box} toplist`}>
                <Accordion className="my-5">
                    <Accordion.Item eventKey="0" className="border-0 border-bottom bg-transparent">
                        <Accordion.Header>
                            <span> 
                                <i className="bi bi-cloud-drizzle"></i> &nbsp;
                                Top 5 provinces with the most rainfall
                            </span>
                            <i className="ms-4 bi bi-chevron-down"></i>
                        </Accordion.Header>

                        <Accordion.Body>
                            <ListGroup variant="flush">
                                { topRain.map((item, index) => (
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

                    <Accordion.Item eventKey="1" className="border-0 border-bottom bg-transparent">
                        <Accordion.Header>
                            <span>
                                <i className="bi bi-sunrise"></i>  &nbsp;
                                Top 5 provinces with the earliest sunrise
                            </span>
                            <i className="ms-4 bi bi-chevron-down"></i>
                        </Accordion.Header>

                        <Accordion.Body>
                            <ListGroup variant="flush">
                                { topSunrise.map((item, index) => (
                                    <ListGroup.Item 
                                        key={index}
                                        className="bg-transparent p-0"
                                    >
                                        <Link
                                            to={`/detail?city=${item.main.param ? item.main.param : item.main.name}`}
                                            className="d-flex justify-content-between text-decoration-none text-light p-2"
                                        >
                                            <span>{item.main.name}</span>
                                            <span>{getTimeFromTimestamp(item.sunrise)}</span>
                                        </Link>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        </Accordion.Body>
                    </Accordion.Item>

                    <Accordion.Item eventKey="2" className="border-0 border-bottom bg-transparent">
                        <Accordion.Header>
                            <span>
                                <i className="bi bi-thermometer-low"></i> &nbsp;
                                Top 5 provinces with the lowest temperature
                            </span>
                            <i className="ms-4 bi bi-chevron-down"></i>
                        </Accordion.Header>

                        <Accordion.Body>
                            <ListGroup variant="flush">
                                { topTemperature.map((item, index) => (
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
                </Accordion>
                
            </div>

            {/* <button className={`${styles.button} position-absolute mt-3`}>
                <Link className='fw-bold text-light text-decoration-none' to="/">Go Home</Link>
            </button> */}
        </Fragment>}
        </Fragment>
    )
};

export default TopList;