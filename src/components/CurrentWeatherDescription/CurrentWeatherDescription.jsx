// import React from 'react';
// import PropTypes from 'prop-types';

// import { Container, Row, Col } from 'react-bootstrap';
// import styles from './CurrentWeatherDescription.module.css';

// import getDayTime from '../../helpers/getDayTime';

// const CurrentWeatherDescription = ({ humidity, wind_speed, rain, clouds, visibility, pressure, sunrise, sunset, uvi }) => {
//     const {getTimeFromTimestamp} = getDayTime();
//     return (
//     <Container className="mt-4 mt-md-2">
//         <div className={styles.gradient}></div>
//         <Row className="mb-2">
//             <Col xs={12} md={6}>
//                 <Row className="d-flex justify-content-center">
//                     <span>Humiduty</span>
//                     <span>{humidity}</span>%
//                 </Row>
//                 <Row className="d-flex justify-content-center">
//                     <span>Wind</span>
//                     <span>{wind_speed}</span>m/s
//                 </Row>
//                 <Row className="d-flex justify-content-center">
//                     <span>Rain</span>
//                     {/* <span>{rain['1h']}</span>mm */}
//                 </Row><Row className="d-flex justify-content-center">
//                     <span>Cloud</span>
//                     <span>{clouds}</span>%
//                 </Row>
//             </Col>
//             <Col xs={12} md={6}>
//                 <Row className="d-flex justify-content-center">
//                     <span>Visibility</span>
//                     <span>{visibility}</span>m
//                 </Row>
//                 <Row className="d-flex justify-content-center">
//                     <span>Pressure</span>
//                     <span>{pressure}</span>hPa
//                 </Row>
//                 <Row className="d-flex justify-content-center">
//                     <span>Sunrise/Sunset</span>
//                     <span>{getTimeFromTimestamp(sunrise)}/{getTimeFromTimestamp(sunset)}</span>
//                 </Row><Row className="d-flex justify-content-center">
//                     <span>UV Index</span>
//                     <span>{uvi}</span>%
//                 </Row>
//             </Col>
//             {/* {currentDetail.map(item => (
//                 <CurrentWeatherDescriptionItem {...item} key={item.name}/>
//             ))} */}
//         </Row>
//     </Container>
// )};

// CurrentWeatherDescription.propTypes = {
//     humidity: PropTypes.number.isRequired,
//     wind: PropTypes.number.isRequired,
//     rain: PropTypes.object.isRequired,
//     cloud: PropTypes.number.isRequired,
//     visibility: PropTypes.number.isRequired,
//     pressure: PropTypes.number.isRequired,
//     sunrise: PropTypes.number.isRequired,
//     sunset: PropTypes.number.isRequired,
//     uv: PropTypes.number.isRequired,
// }

// export default CurrentWeatherDescription;
