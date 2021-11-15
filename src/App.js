import { BrowserRouter, Switch, Route, Link } from "react-router-dom";

import Header from './components/Header';
import HomeBtn from './components/HomeBtn';
import SearchBox from './components/SearchBox';
import WeatherForecast from './components/WeatherForecast/WeatherForecast';
import Location from './components/Location/Location';
import TopList from './components/TopList';
import PageNotFound from './components/PageNotFound';

import "./App.css";

const App = () => {
    return (
        <BrowserRouter>
            <Header />

            <HomeBtn />
            
            {/* Switch return the first matched route  */}
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
                <Route path="*">
                    <PageNotFound/>
                </Route>
            </Switch>

            <Location/>

            <Link
                to="/toplist"
                className="discover-btn button text-decoration-none text-center position-absolute start-50 mt-4"
            >
                Discover
            </Link>
        </BrowserRouter>
    );
};

export default App;