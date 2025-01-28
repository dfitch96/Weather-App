import "./styles.css";

import {fetchWeather, asyncFetchWeather} from './modules/weatherAPI.js';
import {Weather} from './modules/weather.js';
import { displayCurrentConditions } from "./modules/view.js";


const form = document.querySelector("header > form");
const search = form.querySelector("input#input-search");


document.addEventListener("keydown", (event) => {
    if(event.key === 'Enter'){
        
        if(!form.checkValidity()){
            form.reportValidity();
        } else{
            getWeather(search.value);
            form.reset();
        }
        event.preventDefault();
    }
})


function process(response){
    return new Weather(response.resolvedAddress, response.alerts, response.currentConditions, response.days, response.description);
}


const getWeather = (async (location) => {
    const response = await asyncFetchWeather(location);
    const weatherObj = process(response);
    console.log(weatherObj);
    displayCurrentConditions(weatherObj)

});




