import { Fragment, useCallback, useEffect, useState } from 'react';
import { Container, Row, Col, Button, Nav } from 'react-bootstrap';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import queryString from 'query-string';
import Clock from 'react-live-clock';

import getDayTime from '../../helpers/getDayTime';
import setCase from '../../helpers/setCase';
import getWeatherByName from '../../services/getAPIByName';

import styles from './WeatherForecast.module.css';
import './WeatherForecast.css';

const WeatherForecast = () => {
    console.log("From WeatherForecast: ");

    const location = useLocation();
    const { city } = queryString.parse(location.search);
    
    const [fullData, setFullData] = useState(null)

    const getAPI = useCallback (
        async () => {
            try {
                const data = await getWeatherByName(city);
                console.log("Data", data);
                setFullData(data);
            } catch (err) {
                console.log("Khong lay duoc API");
            }
        }
    , [city]);

    useEffect(() => {
        getAPI();
    }, [getAPI]);

    const { getWeekDay, getHourFromTimestamp } = getDayTime();
    const { upperFirstOfWord } = setCase();
    
    const initArrayObject = () => [
        {
            title: "",
            icon: "",
            value: ""
        },
        {
            title: "",
            icon: "",
            value: ""
        },
        {
            title: "",
            icon: "",
            value: ""
        },
        {
            title: "",
            icon: "",
            value: ""
        },
        {
            title: "",
            icon: "",
            value: ""
        },
        {
            title: "",
            icon: "",
            value: ""
        }
    ]

    const [data, setData] = useState(initArrayObject());
    
    const onClickDetail = async () => {
        try {
            const {wind_speed, clouds, dew_point, humidity, visibility, uvi} = await fullData.current;
            const weatherDetailItems = [
                {
                    title: "Wind",
                    icon: <i className="bi bi-wind"></i>,
                    value: wind_speed + "m/s"
                },
                {
                    title: "Cloud",
                    icon: <i className="bi bi-clouds"></i>,
                    value: clouds + "%"
                },
                {
                    title: "Dew Point",
                    icon: <i className="bi bi-cloud-lightning-rain"></i>,
                    value: Math.round(dew_point - 273.15) + "°C"
                },
                {
                    title: "Humidity",
                    icon: <i className="bi bi-droplet-half"></i>,
                    value: humidity + "%"
                },
                {
                    title: "Visibility",
                    icon: <i className="bi bi-eyeglasses"></i>,
                    value: Math.round(visibility/1000) + "km"
                },
                {
                    title: "UV Index",
                    icon: <i className="bi bi-brightness-low"></i>,
                    value: uvi
                }
            ];
            setData(weatherDetailItems);
        } catch (e) {
            console.log("Fail to read weather detail");
        }
    }

    const onClickHourly = async () => {
        try {
            const hour = await fullData.hourly;
            let hourlyForecastItmes = initArrayObject();
            for(let i=0; i<6; i++) {
                hourlyForecastItmes[i].title = getHourFromTimestamp(hour[i+1].dt) + ":00";
                hourlyForecastItmes[i].icon = <img src={`http://openweathermap.org/img/wn/${hour[i+1].weather[0].icon}@2x.png`} alt="weather icon" />;
                hourlyForecastItmes[i].value = Math.round(hour[i+1].temp - 273.15) + "°C";
            }
            setData(hourlyForecastItmes);
        } catch (e) {
            console.log("Fail to read weather forecast hourly");
        }
    }

    const onClickDaily = async () => {
        try {
            const day = await fullData.daily;
            let dailyForecastItems = initArrayObject();
            for(let i=0; i<6; i++) {
                dailyForecastItems[i].title = getWeekDay(new Date(day[i+1].dt * 1000));
                dailyForecastItems[i].icon = <img src={`http://openweathermap.org/img/wn/${day[i+1].weather[0].icon}@2x.png`} alt="weather icon" />;
                dailyForecastItems[i].value = Math.round(day[i+1].temp.day - 273.15) + "°C";
            }
            setData(dailyForecastItems);
        } catch (e) {
            console.log("Fail to read weather forecast daily");
        }
    }

    const [forecastDetail, setForecastDetail] = useState(null);

    return (
        <Fragment>
        {fullData &&
        <Container className={`weather-forecast ${styles.box}`}>
            {/* Basic Info */}
            <Row className="p-3">
                <Col xs={12} sm={6} md={8} className="d-flex flex-column">
                    <span className={styles.date}>
                        {/* {getDateString(new Date(fullData.current.dt * 1000))} */}
                        <Clock format={'HH:mm:ss'} ticking={true} timezone={fullData.timezone} /><br/>
                        <Clock format={'dddd, MMMM Do, YYYY'} ticking={true} timezone={fullData.timezone} /> 
                    </span>
                    <span className={styles.location}>
                        {city}
                    </span>
                    <div className={styles['weather-icon-descript']}>
                        <img
                            src={`http://openweathermap.org/img/wn/${fullData.current.weather[0].icon}@2x.png`}
                            alt='weather icon'
                            width="100px"
                        />
                        <div className={styles.description}>
                            { upperFirstOfWord(fullData.current.weather[0].description) }
                        </div>
                    </div>
                </Col>

                <Col xs={12} sm={6} md={4} className={`${styles['temp-col']} d-flex flex-column align-items-end pe-2`}>
                    <div className="position-relative mr-5 lh-lg">
                        <span className={styles.temp}>
                            {Math.round(fullData.current.temp - 273.15)}
                        </span>
                        <span className={`${styles.celsius} position-absolute top-0`}>°C</span>
                    </div>
                    <span className={styles['min-max-temp']}>
                        {Math.round(fullData.daily[0].temp.min - 273.15)}°C /&nbsp;
                        {Math.round(fullData.daily[0].temp.max - 273.15)}°C
                    </span>
                </Col>
            </Row>

            {/* Nav */}
            <Row className="mt-4">
                <Nav fill variant="tabs">
                    <Nav.Item>
                        <Nav.Link
                            eventKey="1" 
                            className={styles['nav-link']}
                            onClick={onClickDetail}
                        >
                            Detail
                        </Nav.Link>
                    </Nav.Item>

                    <Nav.Item>
                        <Nav.Link
                            eventKey="2" 
                            className={styles['nav-link']}
                            onClick={onClickHourly}
                        >
                            Hourly
                        </Nav.Link>
                    </Nav.Item>

                    <Nav.Item>
                        <Nav.Link
                            eventKey="3" 
                            className={styles['nav-link']}
                            onClick={onClickDaily}
                        >
                            Daily
                        </Nav.Link>
                    </Nav.Item>
                </Nav>
            </Row>

            {/* Detail and Forecast */}
            <Row className="p-3">
                {data.map((dataItem, index) => (
                    <Col 
                        xs={6} sm={4} md={3} lg={2}
                        className={`${styles['detail-item']} mb-5 text-center`}
                        key={index}
                    >
                        <div className={`${styles['detail-item-title']} font-weight-bold`}>
                            {dataItem.title}
                        </div>
                        {dataItem.icon}
                        <div>{dataItem.value}</div>
                    </Col>
                ))}
            </Row>

            { forecastDetail && <Row className="p-3">
                {forecaseDetail.map((dataItem, index) => (
                    <Col 
                        xs={6} sm={4} md={3} lg={2}
                        className={`${styles['detail-item']} mb-5 text-center`}
                        key={index}
                    >
                        <div className={`${styles['detail-item-title']} font-weight-bold`}>
                            {dataItem.title}
                        </div>
                        {dataItem.icon}
                        <div>{dataItem.value}</div>
                    </Col>
                ))}
            </Row>}
        </Container>}

        <Button className={`${styles.button} position-absolute mt-3`}>
            <Link to="/" className="fw-bold text-light text-decoration-none">Go Home</Link>
        </Button>

        </Fragment>
    );
}

export default WeatherForecast;