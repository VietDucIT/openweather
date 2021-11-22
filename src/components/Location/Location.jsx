import { Fragment, useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { OverlayTrigger, Tooltip, Button, Modal, Form } from 'react-bootstrap';

import MyMap from '../MyMap';

import city from '../../json/city';

import "./Location.css";
import styles from './Location.module.css';

const Location = () => {
    const [myCity, setMyCity] = useState();

    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    const LOCAL_STORAGE_KEY = "LOCATION";

    // get location
    useEffect(() => {
        const storagedLocation = localStorage.getItem(LOCAL_STORAGE_KEY);
        if(storagedLocation) {
            setMyCity(storagedLocation);
        }
    }, []);

    // set location
    useEffect(() => {
        if(myCity) {
            localStorage.setItem(LOCAL_STORAGE_KEY, myCity);
        }
    }, [ myCity ]);

    // localStorage.removeItem(LOCAL_STORAGE_KEY);

    const showMyCity = cityParam => {
        const cityItem = city.find(item => item.param === cityParam);
        return cityItem ? cityItem.name : cityParam;
    }

    return (
        <Fragment>
        {/* Button "Choose location" || city name */}
        <OverlayTrigger
            placement="left"
            overlay={
                <Tooltip id="location-btn-tooltip">
                    Change your location
                </Tooltip>
            }
        >
            <Button
                className={styles['location-button']}
                onClick={handleShow}
            >
                <i className="bi bi-geo-alt-fill"/> &nbsp;
                {myCity ? showMyCity(myCity) : "Choose your location"}
            </Button>
        </OverlayTrigger>

        {/* Modal */}
        <Modal
            show={show} onHide={handleClose}
            className="modal-location text-dark"
        >
            <Modal.Header closeButton>
                <Modal.Title className={`${styles['form-title']} fw-bold`}>
                    Where are you now?
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                {/* Form */}
                <Form>
                    <Form.Group className="mb-3" controlId="country">
                        <Form.Label>Country: </Form.Label>
                        <Form.Select className={styles['form-select']}>
                            <option value="Vietnam">Việt Nam</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="province">
                        <Form.Label>Province:</Form.Label>
                        <Form.Select
                            className={styles['form-select']}
                            onChange={e => setMyCity(e.target.value)}
                        >
                            <option>
                                Choose a province...
                            </option>
                            
                            { city.map(cityItem => (
                                <option
                                    key={cityItem.id}
                                    value={cityItem.param ? cityItem.param : cityItem.name}
                                >
                                    {cityItem.name}
                                </option>
                            )) }
                        </Form.Select>
                    </Form.Group>
                </Form>
                
                {/* Map */}
                <div>
                    <p className="mt-4">
                        Or Choose a province in the map:
                    </p>
                    <MyMap setMyCity={setMyCity}/>
                </div>
            </Modal.Body>

            <Modal.Footer>
                <Button
                    className={`btn ${styles.button} ${styles['grey-btn']}`}
                    onClick={handleClose}
                >
                    Close
                </Button>

                <Button
                    className={`btn ${styles.button}`}
                    onClick={handleClose}
                >
                    <Link to={`detail?city=${myCity}`}
                        className="text-light text-decoration-none"
                    >
                        Go to
                    </Link>
                </Button>
            </Modal.Footer>
        </Modal>
        </Fragment>
    )
}

export default Location;