import axios from "axios";

import city from '../json/city';

const REQUEST_URL = 'https://api.openweathermap.org/data/2.5';
const APP_ID = 'bb9bbd0e67532f3f8e965fe6fba10ece';

const getWeatherByCoord = (lon, lat) => {
    return new Promise (async (resolve, reject) => {
        const location = city.find(item => (item.coord.lon === lon && item.coord.lat === lat));
        const main = {name: location.name, param: location.param};
        // console.log("From getAPIByCoord.js: Main = ", main);

        const {data: dailyData, status } = await axios(`${REQUEST_URL}/onecall`, {params: {lat: lat, lon: lon, appid: `${APP_ID}`}});
        const daily = dailyData.daily[0];
        // console.log("From getAPIByCoord.js: todayData = ", daily);
        // console.log('status', status);

        daily.main = {...main};

        if( status === 200) {
            resolve(daily);
        }
        else {
            reject("Can't get weather data by coordinate of this city");
        }
    });
}

export default getWeatherByCoord;