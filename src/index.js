import "./styles.css";

import {fetchWeather, asyncFetchWeather} from './modules/weatherAPI.js';
import {Weather} from './modules/weather.js';




function process(response){
    return new Weather(response.address, response.alerts, response.currentConditions, response.days, response.description);
}


const weather = (async () => {
    const response = await asyncFetchWeather('Buffalo');
    const weatherObj = process(response);
    console.log(weatherObj);
})();




