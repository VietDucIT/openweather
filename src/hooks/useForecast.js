import { useState } from "react";
import axios from "axios";

import getCurrentDayForecast from '../helpers/getCurrentDayForecast';
import getCurrentDayDetailedForecast from '../helpers/getCurrentDayDetailedForecast';
import getUpcomingDaysForecast from "../helpers/getUpcomingDaysForecast";

// const BASE_URL = 'https://www.metaweather.com/api/location';
// const CROSS_DOMAIN = 'https://the-ultimate-api-challenge.herokuapp.com';

// const REQUEST_URL = `${CROSS_DOMAIN}/${BASE_URL}`;
const REQUEST_URL = `https://api.openweathermap.org/data/2.5/weather`;

const useForecast = () => {
    const [isLoading, setLoading] = useState(false);
    const [forecast, setForecast] = useState(null);
    const [hasError, setError] = useState(false);

    const getWoeid = async location => {
        const data = await axios(`${REQUEST_URL}`, {params: {q: location, appid: 'bb9bbd0e67532f3f8e965fe6fba10ece'}});
        console.log(data);
        // console.log({data.base });

        if(!data || data.length === 0) {
            setError("No such location");
            setLoading(false);
            return;
        }
        return data[0];
    }

    const getForecastData = async woeid => {
        const { data } = await axios(`${REQUEST_URL}/${woeid}`);

        if(!data || data.length === 0) {
            setError("Something went wrong");
            setLoading(false);
            return;
        }
        return data;
    }

    const gatherForecastData = data => {
        const currentDay = getCurrentDayForecast(data.consolidated_weather[0], data.title);
        const currentDayDetails = getCurrentDayDetailedForecast(data.consolidated_weather[0]);
        const upcomingDays = getUpcomingDaysForecast(data.consolidated_weather);

        setForecast({ currentDay, currentDayDetails, upcomingDays });
        setLoading(false);
    }

    const submitRequest = async location => {
        setLoading(true);
        setError(false);

        const response = await getWoeid(location);
        if(!response?.woeid) return;

        const data = await getForecastData(response.woeid);
        if(!data) return;
        
        gatherForecastData(data);

    };

    return {
        isLoading,
        forecast,
        hasError,
        submitRequest,
    };
}

export default useForecast;