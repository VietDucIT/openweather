import { Fragment, useCallback, useEffect, useState } from 'react';
import { Container, Row, Col, Nav } from 'react-bootstrap';
import { useLocation } from 'react-router';
import queryString from 'query-string';
import Clock from 'react-live-clock';

import getDayTime from '../../helpers/getDayTime';
import setCase from '../../helpers/setCase';
import getWeatherByName from '../../services/getAPIByName';

import styles from './WeatherForecast.module.css';
import './WeatherForecast.css';

const WeatherForecast = () => {
    // console.log("From WeatherForecast: ");

    const location = useLocation();
    const { city } = queryString.parse(location.search);
    
    const [fullData, setFullData] = useState(null)

    // Get full data
    const getAPI = useCallback (
        async () => {
            try {
                const data = await getWeatherByName(city);
                console.log("From WeatherForecast: Data", data);
                setFullData(data);
            } catch (err) {
                console.log("Can not call API");
            }
        }
    , [city]);

    useEffect(() => {
        getAPI();
    }, [getAPI]);
    
    // Khoi tao mang rong
    const initArrayObject = () => [
        {
            type: "",
            title: "",
            icon: "",
            value: ""
        },
        {
            type: "",
            title: "",
            icon: "",
            value: ""
        },
        {
            type: "",
            title: "",
            icon: "",
            value: ""
        },
        {
            type: "",
            title: "",
            icon: "",
            value: ""
        },
        {
            type: "",
            title: "",
            icon: "",
            value: ""
        },
        {
            type: "",
            title: "",
            icon: "",
            value: ""
        }
    ]

    const [data, setData] = useState(initArrayObject());

    const { getTimeFromTimestamp, getDateString, getWeekDay, getHourFromTimestamp } = getDayTime();
    const { upperFirstOfWord } = setCase();
    
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
            setForecastDetail(null);        // Ẩn phần dự báo cho hourly và daily
        } catch (e) {
            console.log("Fail to read weather detail");
        }
    }

    const onClickHourly = async () => {
        try {
            const hour = await fullData.hourly;
            let hourlyForecastItems = initArrayObject();
            for(let i=0; i<6; i++) {
                hourlyForecastItems[i].type = "hourly";
                // <Clock format={'HH:mm'} ticking={true} timezone={fullData.timezone} />
                hourlyForecastItems[i].title = getHourFromTimestamp(hour[i+1].dt, fullData.timezone_offset) + ":00";
                hourlyForecastItems[i].icon = <img src={`http://openweathermap.org/img/wn/${hour[i+1].weather[0].icon}@2x.png`} alt="weather icon" />;
                hourlyForecastItems[i].value = Math.round(hour[i+1].temp - 273.15) + "°C";
            }
            setData(hourlyForecastItems);
            setForecastDetail(null);
        } catch (e) {
            console.log("Fail to read weather forecast hourly");
        }
    }

    const onClickDaily = async () => {
        try {
            const day = await fullData.daily;
            let dailyForecastItems = initArrayObject();
            for(let i=0; i<6; i++) {
                dailyForecastItems[i].type = "daily";
                dailyForecastItems[i].title = getWeekDay(new Date(day[i+1].dt * 1000));
                dailyForecastItems[i].icon = <img src={`http://openweathermap.org/img/wn/${day[i+1].weather[0].icon}@2x.png`} alt="weather icon" />;
                dailyForecastItems[i].value = Math.round(day[i+1].temp.day - 273.15) + "°C";
            }
            setData(dailyForecastItems);
            setForecastDetail(null);
        } catch (e) {
            console.log("Fail to read weather forecast daily");
        }
    }

    const [forecastDetail, setForecastDetail] = useState(null);
    // const [activeItem, setActiveItem] = useState(null);
    const [forecastDetailTitle, setForecastDetailTitle] = useState(null);

    const onClickDetailItem = async (type, index) => {
        try {
            const {dt, wind_speed, clouds, dew_point, humidity, pressure, uvi} = await fullData[type][index];
            const date = new Date(dt*1000);
            var time;
            if(type === "hourly") {
                time = getTimeFromTimestamp(dt, fullData.timezone_offset) + " " + getDateString(date);
            }
            else {
                time = getWeekDay(date) + " " + getDateString(date);
            }
            // console.log(time);
            const detailItems = [
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
                    title: "Pressure",
                    icon: <img src="./assets/pressure.ico" alt="pressure" style={{width: "45px", margin: "20px"}}/>,
                    value: pressure + "hPa"
                },
                {
                    title: "UV Index",
                    icon: <i className="bi bi-brightness-low"></i>,
                    value: uvi
                }
            ];
            setForecastDetail(detailItems);
            setForecastDetailTitle(time);
            // setActiveItem("active");
        } catch (e) {
            console.log("Fail to read forecast detail");
        }
    }

    return (
        <Fragment>
        {fullData &&
        <Container className={`weather-forecast ${styles.box}`}>
            {/* Basic Info */}
            <Row className="p-3">
                <Col xs={12} sm={6} md={8} className="d-flex flex-column">
                    <span className={styles.date}>
                        <Clock format={'HH:mm:ss'} ticking={true} timezone={fullData.timezone} />
                        {fullData.timezone_offset/3600 !== 7 ? ' GMT+' + fullData.timezone_offset/3600 : null}
                        <br/>
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
                        className={`${styles['detail-item']} detail-item mb-5 text-center`}
                        key={index}
                        onClick={() => onClickDetailItem(dataItem.type, index+1)}
                    >
                        <div className={`${styles['detail-item-title']} font-weight-bold`}>
                            {dataItem.title}
                        </div>
                        {dataItem.icon}
                        <div>{dataItem.value}</div>
                    </Col>
                ))}
            </Row>

            { forecastDetail && 
            <Fragment>
                <Row>
                    <p className={`${styles['forecast-detail-title']} text-center`}>
                        Detail of Weather Forecast for <b>{forecastDetailTitle}</b>
                    </p>
                </Row>
                <Row className="forecast-detail p-3">
                    {forecastDetail.map((dataItem, index) => (
                        <Col 
                            xs={6} sm={4} md={3} lg={2}
                            className={`${styles['detail-item']} detail-item mb-5 text-center`}
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
            </Fragment>}
        </Container>}
        </Fragment>
    );
}

export default WeatherForecast;