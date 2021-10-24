import React, { Fragment } from 'react';
import {BrowserRouter, Switch, Route, Link } from "react-router-dom";

import Header from './components/Header';
import SearchBox from './components/SearchBox';
import WeatherForecast from './components/WeatherForecast/WeatherForecast';
import Location from './components/Location/Location';
import TopList from './components/TopList';

import "./App.css";

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
                    <Route path="/toplist">
                        <TopList/>
                    </Route>
                </Switch>
                <Location/>
                <button type="button" className="button">
                    <Link to="/toplist">Discover</Link>
                </button>
            </Fragment>
        </BrowserRouter>
    );
};

export default App;