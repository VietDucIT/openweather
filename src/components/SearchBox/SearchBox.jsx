import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

import Form from '../Form';

import styles from './SearchBox.module.css';

const SearchBox = () => {
    // const slide = [
    //     {
    //         location: "Hà Nội",
    //         image: "hanoi.jpg"
    //     },
    //     {
    //         location: "Quảng Ninh",
    //         image: "quangninh.jpg"
    //     },
    //     {
    //         location: "Thừa Thiên - Huế",
    //         image: "hue.jpg"
    //     },
    //     {
    //         location: "Đà Nẵng",
    //         image: "danang.jpg"
    //     },
    //     {
    //         location: "TP. Hồ Chí Minh",
    //         image: "saigon.jpg"
    //     },
    //     {
    //         location: "Cần Thơ",
    //         image: "cantho.jpg"
    //     }
    // ]

    return (
        <Fragment>
            <div className={`${styles.box}`}>
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col col-md-6 col-12">
                            <Form />
                        </div>

                        {/* Slide show */}
                        <div className="col col-md-6 col-12">
                            <div id="carouselExampleSlidesOnly" className="carousel slide" data-ride="carousel">
                                <div className="carousel-inner">
                                    <div className={`carousel-item ${styles['carousel-item']} active`} >
                                        <Link to="detail?city=ha%20noi">
                                            <img className="d-block w-100" src="./assets/images/hanoi.jpg" alt="Hà Nội"/>
                                            <div className={`${styles['carousel-caption']} carousel-caption d-none d-sm-block`}>
                                                Hà Nội
                                            </div>
                                        </Link>
                                    </div>

                                    <div className={`carousel-item ${styles['carousel-item']}`}>
                                        <Link to="detail?city=ha%long">
                                            <img className="d-block w-100" src="./assets/images/quangninh.jpg" alt="Quảng Ninh"/>
                                            <div className={`${styles['carousel-caption']} carousel-caption d-none d-sm-block`}>
                                                Quảng Ninh
                                            </div>
                                        </Link>
                                    </div>
                                    
                                    <div className={`carousel-item ${styles['carousel-item']}`}>
                                        <Link to="detail?city=hue">
                                            <img className="d-block w-100" src="./assets/images/hue.jpg" alt="Thừa Thiên - Huế"/>
                                            <div className={`${styles['carousel-caption']} carousel-caption d-none d-sm-block`}>
                                                Thừa Thiên - Huế
                                            </div>
                                        </Link>
                                    </div>

                                    <div className={`carousel-item ${styles['carousel-item']}`}>
                                        <Link to="detail?city=da%20nang">
                                            <img className="d-block w-100" src="./assets/images/danang.jpg" alt="Đà Nẵng"/>
                                            <div className={`${styles['carousel-caption']} carousel-caption d-none d-sm-block`}>
                                                Đà Nẵng
                                            </div>
                                        </Link>
                                    </div>

                                    <div className={`carousel-item ${styles['carousel-item']}`}>
                                        <Link to="detail?city=thành%20phố%20hồ%20chí%20minh">
                                            <img className="d-block w-100" src="./assets/images/saigon.jpg" alt="TP. Hồ Chí Minh"/>
                                            <div className={`${styles['carousel-caption']} carousel-caption d-none d-sm-block`}>
                                                TP. Hồ Chí Minh
                                            </div>
                                        </Link>
                                    </div>

                                    <div className={`carousel-item ${styles['carousel-item']}`}>
                                        <Link to="detail?city=can%20tho">
                                            <img className="d-block w-100" src="./assets/images/cantho.jpg" alt="Cần Thơ"/>
                                            <div className={`${styles['carousel-caption']} carousel-caption d-none d-sm-block`}>
                                                Cần Thơ
                                            </div>
                                        </Link>
                                    </div>

                                    {/* { slide.map((slideItem, index) => (
                                        <div className={`carousel-item ${styles['carousel-item']} active`} key={index}>
                                            <Link to={`detail?city=${slideItem.location}`}>
                                                <img className="d-block w-100" src={`./assets/images/${slideItem.image}`} alt={slideItem.location}/>
                                                <div className={`${styles['carousel-caption']} carousel-caption d-none d-sm-block`}>
                                                    {slideItem.location}
                                                </div>
                                            </Link>
                                        </div>
                                    ))
                                    } */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default SearchBox;
