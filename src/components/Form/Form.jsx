import React, {useState} from 'react';
import { Link } from 'react-router-dom';

import styles from './Form.module.css';

const Form = () => {
    const [city, setCity] = useState('');

    return (
        <form className="d-flex flex-column text-center">
            <input
                aria-label="location"
                type="text"
                className={`${styles.input} form-control`}
                placeholder="Search for location"
                required
                value={city}
                onChange={e => setCity(e.target.value)}
            />

            <button className={styles.button}>
                <Link to={`detail?city=${city}`}> SEARCH </Link>
            </button>
        </form>
    );
};

export default Form;
