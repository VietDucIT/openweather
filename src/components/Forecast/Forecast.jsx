import React from 'react';
import PropTypes from 'prop-types';

import { Container, Row, Col } from 'react-bootstrap';

import CurrentWeather from '../CurrentWeather';
import CurrentWeatherDecription from '../CurrentWeatherDescription';
import UpcomingDayForecast from '../UpcomingDaysForecast';

import styles from './Forecast.module.css';

const Forecast = ({ forecast }) => (
    <Container className={styles.box}>
        <Row>
            <Col xs={12} md={4}>
                <div className={styles.card}>
                    <CurrentWeather {...forecast.currentWeather}/>
                </div>
            </Col>
            <Col xs={12} md={8} className="d-flex flex-column justify-content-between">
                <CurrentWeatherDecription forecast={forecast.currentWeatherDetails}/>
                <UpcomingDayForecast days={forecast.upcomingDays}/>
            </Col>
        </Row>
    </Container>
);

Forecast.propTypes = {
    forecast: PropTypes.shape({
        currentWeather: PropTypes.object,
        currentWeatherDetails: PropTypes.array,
        upcomingDays: PropTypes.array
    })
};

export default Forecast;
