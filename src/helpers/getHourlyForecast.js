import getWeather from '../services/api';

const getHourlyForecast = async location => {
    const weather = await getWeather(location);
    return weather.hourly;
};

export default getHourlyForecast;