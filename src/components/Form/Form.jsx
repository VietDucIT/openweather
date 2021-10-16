import React, {useState} from 'react';
import PropTypes from 'prop-types';

import styles from './Form.module.css';

const Form = (props) => {
    const [city, setCity] = useState('');

    const onSubmit = e => {
        e.preventDefault();
        // console.log(city);
        if(!city || city === '') return;
        props.submitSearch(city);
    }

    return (
        <form onSubmit={onSubmit}>
            <input
                aria-label="location"
                type="text"
                className={`${styles.input} form-control`}
                placeholder="Search for location"
                required
                value={city}
                onChange={e => setCity(e.target.value)}
            />

            <button type="submit" className={styles.button} onClick={onSubmit}>
                SEARCH
            </button>
        </form>
    );
};

Form.propTypes = {
    submitSearch: PropTypes.func.isRequired
}

export default Form;
