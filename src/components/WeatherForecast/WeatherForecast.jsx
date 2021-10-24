import { Fragment, useCallback, useEffect, useState } from 'react';
import queryString from 'query-string';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';

import styles from './WeatherForecast.module.css';

import getDayTime from '../../helpers/getDayTime';
import getWeatherByName from '../../services/getAPIByName';

const WeatherForecast = () => {
    // const location = "Can Tho";

    const location = useLocation();
    const { city } = queryString.parse(location.search);

    const [fullData, setFullData] = useState({})

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

    const { getWeekDay, getHourFromTimestamp } = getDayTime();  // getDateString,
    
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

    return (
        <Fragment>
        <div className={`${styles.box} container`}>
            <div className="row p-3">
                <div className="col col-xs-12 col-sm-6 d-flex flex-column">
                    <span className={`${styles.location}`}>Can Tho</span>
                    <span className={`${styles.date}`}>21/10/2021</span>
                    <img src='http://openweathermap.org/img/wn/10n@2x.png' alt='weather icon' width="100px"/>
                    <span className={`${styles.description}`}>Heavy Rain</span>
                </div>

                <div className="col col-xs-12 col-sm-6 d-flex flex-column align-items-end pe-2">
                    <div className="position-relative mr-5 lh-lg">
                        <span className={`${styles.temp}`}>26</span>
                        <span className={`${styles.celsius} position-absolute top-0`}>°C</span>
                    </div>
                    <span className={`${styles['min-max-temp']}`}>MaxTemp/MinTemp</span>
                </div>
            </div>

            <div className="row mt-4">
                <nav className="navbar navbar-expand">
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item mx-3">
                                <span className={`nav-link ${styles['btn-nav-link']}`} onClick={onClickDetail}>Detail</span>
                            </li>
                            <li className="nav-item mx-3">
                                <span className={`nav-link ${styles['btn-nav-link']}`} onClick={onClickHourly}>Hourly</span>
                            </li>
                            <li className="nav-item mx-3">
                                <span className={`nav-link ${styles['btn-nav-link']}`} onClick={onClickDaily}>Daily</span>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>

            <p className={`${styles["white-line"]}`}></p>
            {/* <i className="bi bi-thermometer-half text-light" style={{ fontSize: 20 }}></i> (temperature) */}

            <div className="row p-3">
                {data.map((dataItem, index) => (
                    <div className={`${styles.detailItem} col col-lg-2 col-md-3 col-sm-4 col-xs-6 mb-4 text-center`} key={index}>
                        <div>{dataItem.title}</div>
                        {dataItem.icon}
                        <div>{dataItem.value}</div>
                    </div>
                ))}
            </div>
        </div>

        <button className={`${styles.button} position-absolute mt-3`}>
            <Link to="/">Go Home</Link>
        </button>

        {/* <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d9307828.911743382!2d102.16506891168221!3d16.6899759840894!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31157a4d736a1e5f%3A0xb03bb0c9e2fe62be!2sVietnam!5e0!3m2!1sen!2s!4v1634975628103!5m2!1sen!2s" width="500px" height="500px" style={{border: 0}} className="text-center" allowfullscreen="" loading="lazy" title="weatherMap"></iframe> */}
        </Fragment>
    );
}

export default WeatherForecast;