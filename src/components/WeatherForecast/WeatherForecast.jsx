import { Fragment, useCallback, useEffect, useState } from 'react';
import { Container, Row, Col, Nav } from 'react-bootstrap';
import { useLocation } from 'react-router';
import queryString from 'query-string';
import Clock from 'react-live-clock';

import PageNotFound from "../PageNotFound";

import getDayTime from '../../helpers/getDayTime';
import setCase from '../../helpers/setCase';
import getWeatherByName from '../../services/getAPIByName';

import cityList from '../../json/city.js';

import styles from './WeatherForecast.module.css';
import './WeatherForecast.css';

const WeatherForecast = () => {
    const location = useLocation();
    const { city } = queryString.parse(location.search);
    
    const [fullData, setFullData] = useState(null);

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

    const { getDateString, getWeekDay, getDateTimeString, getHourFromTimestamp } = getDayTime();
    const { upperFirstOfWord } = setCase();
 
    // Click to show Detail items of Current weather   
    const onClickDetail = async () => {
        try {
            const {wind_speed, clouds, dew_point, humidity, visibility, uvi} = await fullData.current;
            const weatherDetailItems = [
                {
                    title: "Wind",
                    icon: <i className="bi bi-wind" />,
                    value: wind_speed + "m/s"
                },
                {
                    title: "Cloud",
                    icon: <i className="bi bi-clouds" />,
                    value: clouds + "%"
                },
                {
                    title: "Dew Point",
                    icon: <i className="bi bi-cloud-lightning-rain" />,
                    value: Math.round(dew_point - 273.15) + "°C"
                },
                {
                    title: "Humidity",
                    icon: <i className="bi bi-droplet-half" />,
                    value: humidity + "%"
                },
                {
                    title: "Visibility",
                    icon: <i className="bi bi-eyeglasses" />,
                    value: Math.round(visibility/1000) + "km"
                },
                {
                    title: "UV Index",
                    icon: <i className="bi bi-brightness-low" />,
                    value: uvi
                }
            ];
            setData(weatherDetailItems);
            setForecastDetail(null);        // hide hourly và daily forecast
        } catch (e) {
            console.log("Fail to read weather detail");
        }
    }

    // Click to show Hourly forecast (6 next hours)
    const onClickHourly = async () => {
        try {
            const hour = await fullData.hourly;
            let hourlyForecastItems = initArrayObject();
            for(let i=0; i<6; i++) {
                hourlyForecastItems[i].type = "hourly";
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

    // Click to show Daily forecast (6 next days)
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
    const [forecastDetailTitle, setForecastDetailTitle] = useState(null);

    // Click to show detail of Hourly/Daily forecast
    const onClickDetailItem = async (type, index) => {
        try {
            const { dt, wind_speed, clouds, dew_point, humidity, pressure, uvi } = await fullData[type][index];
            const date = new Date((dt + fullData.timezone_offset - 7*3600) * 1000);
            var time;
            if(type === "hourly") {
                time = getDateTimeString(date);
            }
            else {
                time = getWeekDay(date) + " " + getDateString(date);
            }
            const detailItems = [
                {
                    title: "Wind",
                    icon: <i className="bi bi-wind" />,
                    value: wind_speed + "m/s"
                },
                {
                    title: "Cloud",
                    icon: <i className="bi bi-clouds" />,
                    value: clouds + "%"
                },
                {
                    title: "Dew Point",
                    icon: <i className="bi bi-cloud-lightning-rain" />,
                    value: Math.round(dew_point - 273.15) + "°C"
                },
                {
                    title: "Humidity",
                    icon: <i className="bi bi-droplet-half" />,
                    value: humidity + "%"
                },
                {
                    title: "Pressure",
                    icon: <img src="./assets/pressure.ico" alt="pressure" style={{width: "45px", margin: "20px"}}/>,
                    value: pressure + "hPa"
                },
                {
                    title: "UV Index",
                    icon: <i className="bi bi-brightness-low" />,
                    value: uvi
                }
            ];
            setForecastDetail(detailItems);
            setForecastDetailTitle(time);
        } catch (e) {
            console.log("Fail to read forecast detail");
        }
    }

    // Change city param (if any) to city name
    const showCity = cityParam => {
        const cityItem = cityList.find(item => item.param === cityParam);
        return cityItem ? cityItem.name : cityParam;
    }

    return (
        <Fragment>
        {!fullData ?
            <PageNotFound />
            : 
            <Container className={`weather-forecast ${styles.box}`}>

                {/* Basic Info */}
                <Row className="p-3">
                    {/* Clock, City name and Weather description */}
                    <Col
                        xs={12} sm={6} md={8}
                        className="d-flex flex-column"
                    >
                        <span className={styles.date}>
                            <Clock
                                format={'HH:mm:ss'} ticking={true}
                                timezone={fullData.timezone}
                            />
                            {fullData.timezone_offset/3600 === 7 ? null :
                                fullData.timezone_offset > 0 ? ' GMT+' + fullData.timezone_offset/3600 :
                                ' GMT' + fullData.timezone_offset/3600}
                            <br/>
                            <Clock
                                format={'dddd, MMMM Do, YYYY'} ticking={true}
                                timezone={fullData.timezone}
                            /> 
                        </span>

                        <span className={styles.location}>
                            {showCity(city)}
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

                    {/* Temperature */}
                    <Col
                        xs={12} sm={6} md={4}
                        className={`${styles['temp-col']} d-flex flex-column align-items-end pe-2`}
                    >
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

                {/* Detail and Hourly and Daily Forecast */}
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

                {/* Forecast Detail Item */}
                { forecastDetail && 
                <Fragment>
                    {/* Title */}
                    <Row>
                        <p className={`${styles['forecast-detail-title']} text-center`}>
                            Detail of Weather Forecast for <b>{forecastDetailTitle}</b>
                        </p>
                    </Row>

                    {/* Items */}
                    <Row className="forecast-detail p-3">
                        { forecastDetail.map((dataItem, index) => (
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
                        )) }
                    </Row>
                </Fragment>}

            </Container>}
        </Fragment>
    );
}

export default WeatherForecast;