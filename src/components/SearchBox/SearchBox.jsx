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
                    {/* Form */}
                    <Col xs={12} md={6} className="my-4 mt-md-0">
                        <Form />
                    </Col>

                    {/* Carousel */}
                    <Col xs={12} md={6} className="my-md-0 my-3">
                        <Carousel controls={false} indicators={false} interval={3000} fade>
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
                        </Carousel>
                    </Col>
                </Row>
            </Container>
            </div>
        </Fragment>
    );
};

export default SearchBox;
