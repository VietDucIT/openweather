import React, { Fragment } from 'react';
import {BrowserRouter, Switch, Route } from "react-router-dom";

import Header from './components/Header';
import SearchBox from './components/SearchBox';
import WeatherForecast from './components/WeatherForecast/WeatherForecast';
import Location from './components/Location/Location';

const App = () => {
    return (
        <BrowserRouter>
            <Fragment>
                <Header />
                <Switch>
                    <Route exact path="/">
                        <SearchBox/>
                    </Route>
                    <Route path="/detail">
                        <WeatherForecast/>
                    </Route>
                </Switch>
                <Location/>
            </Fragment>
        </BrowserRouter>
    );
};

export default App;