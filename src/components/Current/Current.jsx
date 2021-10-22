// import React from 'react';
// import PropTypes from 'prop-types';

// import { Container, Row, Col } from 'react-bootstrap';

// import CurrentWeather from '../CurrentWeather';
// import CurrentWeatherDecription from '../CurrentWeatherDescription';

// import styles from './Current.module.css';

// const Current = ({ current, city }) => {
//     return (
//     <Container className={styles.box}>
//         <Row>
//             <Col xs={12}>
//                 <div className={styles.card}>
//                     <CurrentWeather current={current} city={city}/>
//                 </div>
//             </Col>
//         </Row>
//         <Row>
//             <Col xs={12}>
//                 <div className={styles.card}>
//                     <CurrentWeatherDecription current={current}/>
//                 </div>
//             </Col>
//             {/* <Col xs={12} md={8} className="d-flex flex-column justify-content-between">
//                 <CurrentWeatherDecription forecast={forecast.currentWeatherDetails}/>
//                 <UpcomingDayForecast days={forecast.upcomingDays}/>
//             </Col>  */}
//         </Row>
//     </Container>
// )};

// Current.propTypes = {
//     current: PropTypes.object.isRequired,
//     city: PropTypes.string.isRequired
// };

// export default Current;
