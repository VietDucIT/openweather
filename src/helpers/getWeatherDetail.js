import getWeather from '../services/api';

const getWeatherDetail = async location => {
    const weather = await getWeather(location);
    const {wind_speed, clouds, rain, humidity, visibility, uvi} = weather.current;
    
    if(!rain) rain = {"1h": 0};
    // console.log("From getWeatherDetail:", {wind_speed, clouds, rain, humidity, visibility, uvi});
    return {
        wind_speed,
        clouds,
        rain,
        humidity,
        visibility,
        uvi
    }
};

export default getWeatherDetail;