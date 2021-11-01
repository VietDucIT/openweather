import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Carousel } from 'react-bootstrap';

import Form from '../Form';

import slider from "../../json/slider";

import styles from './SearchBox.module.css';

const SearchBox = () => {

    return (
        <Fragment>
            <div className={styles.box}>
            <Container>
                <Row className="d-flex align-items-center">
                    {/* <div className="col col-md-6 col-12"> */}
                    <Col xs={12} md={6} className="my-4 mt-md-0">
                        <Form />
                    </Col>

                    {/* Slide show */}
                    {/* <div className="col col-md-6 col-12"> */}
                    <Col xs={12} md={6} className="my-md-0 my-3">
                        <Carousel controls={false} indicators={false}>
                            { slider.map((slideItem, index) => (
                                <Carousel.Item key={index}>
                                    <Link
                                        to={`detail?city=${slideItem.param ? slideItem.param : slideItem.location}`}
                                        className="text-decoration-none"
                                    >
                                        <img
                                            src={`./assets/images/${slideItem.image}`}
                                            alt={slideItem.location}
                                            className={`${styles['carousel-item-img']} d-block w-100`}
                                        />
                                        <Carousel.Caption className={styles['carousel-caption']}>
                                            {slideItem.location}
                                        </Carousel.Caption>
                                    </Link>
                                </Carousel.Item>
                            ))
                            }

                            {/* <Carousel.Item>
                                <Link to="detail?city=ha%20noi">
                                    <img className="d-block w-100" src="./assets/images/hue.jpg" alt="Thừa Thiên - Huế"/>
                                    <Carousel.Caption className={styles['carousel-caption']}>
                                        Ha Giang
                                    </Carousel.Caption>
                                </Link>
                            </Carousel.Item> */}
                        </Carousel>


                        {/* <div id="carouselExampleSlidesOnly" className="carousel slide" data-ride="carousel">
                            <div className="carousel-inner">
                                <div className={`carousel-item ${styles['carousel-item']} active`} >
                                    <Link to="detail?city=ha%20noi">
                                        <img className="d-block w-100" src="./assets/images/hanoi.jpg" alt="Hà Nội"/>
                                        <div className={`${styles['carousel-caption']} carousel-caption d-none d-sm-block`}>
                                            Hà Nội
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </div> */}
                    </Col>
                </Row>
            </Container>
            </div>
        </Fragment>
    );
};

export default SearchBox;
