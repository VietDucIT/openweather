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

            <Link to="/toplist" className="button text-decoration-none text-center d-inline-block mt-4">
                Discover
            </Link>
        </BrowserRouter>
    );
};

export default App;