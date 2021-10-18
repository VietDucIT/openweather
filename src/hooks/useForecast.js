import { useState } from "react";
import axios from "axios";

import getCurrentDayForecast from '../helpers/getCurrentDayForecast';
import getCurrentDayDetailedForecast from '../helpers/getCurrentDayDetailedForecast';
import getUpcomingDaysForecast from "../helpers/getUpcomingDaysForecast";

const REQUEST_URL = 'https://api.openweathermap.org/data/2.5';
const APP_ID = 'bb9bbd0e67532f3f8e965fe6fba10ece';

const useForecast = () => {
    const [isLoading, setLoading] = useState(false);
    const [forecast, setForecast] = useState(null);
    const [hasError, setError] = useState(false);

    const getWoeid = async location => {
        const { data } = await axios(`${REQUEST_URL}/weather`, {params: {q: location, appid: `${APP_ID}`}});
        console.log(data);

        if(!data || Object.keys(data).length === 0) {
            setError("No such location");
            setLoading(false);
            return;
        }
        return data;
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