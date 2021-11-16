import { useState } from 'react';
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
                value={city}
                onChange={e => setCity(e.target.value)}
                required
            />

            {city ? 
                <Link
                    to={`detail?city=${city}`}
                    className="button text-decoration-none text-light"
                >
                    SEARCH
                </Link>
                :
                <div className="button disable">SEARCH</div>
            }
            
            {/* <Link
                to={`detail?city=${city}`}
                className="button text-decoration-none"
            >
                SEARCH
            </Link> */}
        </form>
    );
};

export default Form;
