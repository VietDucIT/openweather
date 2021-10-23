import { Link } from 'react-router-dom';
import { Fragment, useState } from "react";

import city from '../../json/city.js';

import styles from './Location.module.css';

const Location = () => {
    const [myCity, setMyCity] = useState("Thành phố Cần Thơ");

    // $('#location').modal('toggle');

    return (
        <Fragment>
        <button type="button" className={`btn ${styles.button}`} data-toggle="modal" data-target="#location">Choose your location</button>

        <div className="modal fade" id="location" tabIndex="-1" role="dialog" aria-labelledby="locationModel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    {/* Modal Header */}
                    <div className="modal-header">
                        <h5 className="modal-title text-dark" id="locationModel">Where are you now?</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>

                    {/* Modal Body */}
                    <div className="modal-body">
                        <form>
                            <div className="form-group">
                                <label htmlFor="country" className="col-form-label text-dark">Country:</label>
                                <input type="text" className="form-control" id="country" placeholder="Viet Nam"/>
                            </div>

                            <div className="form-group">
                                <label htmlFor="province" className="col-form-label text-dark">Province:</label>
                                <select className="form-control" id="province" onChange={e => setMyCity(e.target.value)} value={myCity}>
                                    {/* <option selected>Choose...</option> */}
                                    {city.map(cityItem => (
                                        <option key={cityItem.id}
                                            value={cityItem.param ? cityItem.param : cityItem.name}>{cityItem.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </form>
                    </div>

                    {/* Modal Footer */}
                    <div className="modal-footer">
                        <button type="button" className={`btn ${styles.button} ${styles['grey-btn']}`}  data-dismiss="modal">Close</button>
                        <button type="button" className={`btn ${styles.button}`}>
                            <Link to={`detail?city=${myCity}`}> Go to </Link>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        </Fragment>
    )
}

export default Location;