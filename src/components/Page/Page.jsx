import React, { Fragment } from 'react';

import Header from '../Header';
import Form from '../Form';
import Loader from '../Loader';
import Forecast from '../Forecast';
import Error from '../Error';

import styles from './Page.module.css';

import useForecast from '../../hooks/useForecast';

const Page = () => {
    const {isLoading, forecast, hasError, submitRequest} = useForecast();

    const onSubmit = value => {
        submitRequest(value);
    }

    return (
        <Fragment>
            <Header />
            { !forecast && (
                <div className={`${styles.box} position-relative`}>
                    {isLoading && <Loader/>}
                    {!isLoading && <Form submitSearch={onSubmit}/>}
                    {hasError && <Error message={hasError}/>}
                </div>
            )}
            {forecast && <Forecast forecast={forecast}/>}
        </Fragment>
    );
};

export default Page;
