import React, { Fragment } from 'react';
import {BrowserRouter, Switch, Route } from "react-router-dom";

import Header from './components/Header';
import SearchBox from './components/SearchBox';
// import Detail from './components/Detail';
import WeatherForecast from './components/WeatherForecast/WeatherForecast';

const App = () => {
    return (
        <BrowserRouter>
            <Fragment>
                <Header />
                <Switch>
                    <Route exact path="/">
                        <SearchBox/>
                    </Route>
                    {/* <Route path='/detail'>
                        <Detail/>
                    </Route> */}
                    <Route path="/detail">
                        <WeatherForecast/>
                    </Route>
                </Switch>
            </Fragment>
        </BrowserRouter>
    );
};

export default App;