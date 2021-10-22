import React from 'react';
import PropTypes from 'prop-types';

import locationIcon from './assets/location-pin.png';
import styles from './CurrentWeather.module.css';

import getDayTime from '../../helpers/getDayTime';

const CurrentWeather = ({current, city}) => {
    console.log(12345, current);
    console.log("city", city);

    const {getDayString, getWeekDay, getTime} = getDayTime();
    const date = new Date();
    // const [date, setDate] = useState(new Date());

    // useEffect(
    //     setInterval(setDate(new Date()), 1000)
    // , []);

    const temp = Math.round((current.temp-273.15)*100)/100; // temperature in Kelvin

    return (
    <div className="d-flex">
        <div className={styles.img}></div>
        <div className={styles.gradient}></div>
        <div className={`${styles.cardInner} d-flex justify-content-around pt-3 pb-2 w-100`}>
            <div>
                <h2 className="font-weight-bold mb-1">{getWeekDay(date)}</h2>
                <p className="mb-0" style={{"font-size": "22px"}}>{getDayString(date)}</p>
                {/* <p className="mb-0">{getTime(date)}</p> */}
                <p className="d-flex align-items-baseline font-weight-lighter mb-1">
                    <img src={locationIcon} alt="location pin icon" className="mr-1" width="10px" height="15px"/>
                    <span>{city}</span>
                </p>
            </div>
            <div>
                <h2 className="font-weight-bold mb-1">
                    <span>{temp}</span>°C
                    <img src={`http://openweathermap.org/img/wn/${current.weather[0].icon}@2x.png`} alt="" width="55px"/>
                </h2>
                <h3 className="font-weight-lighter">{current.weather[0].description}</h3>
            </div>
        </div>
    </div>
)};

CurrentWeather.propTypes = {
    current: PropTypes.object.isRequired,
    city: PropTypes.string.isRequired
};

export default CurrentWeather;
