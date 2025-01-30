import "./styles.css";

import {fetchWeather, asyncFetchWeather} from './modules/weatherAPI.js';
import {Weather} from './modules/weather.js';
import { displayCurrentConditions, displayWeeklyConditions, displayHourlyConditions} from "./modules/view.js";


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
    const hours = getHourlyData(weatherObj);
    displayHourlyConditions(hours);
    displayWeeklyConditions(weatherObj);

});

function getHourlyData(weatherObj){

    const todaysDate = new Date();

    const day = weatherObj.days.find(day => {
        let date = new Date(day.datetime + "T00:00:00Z"); // Forces UTC interpretation

        return (
            date.getUTCFullYear() === todaysDate.getFullYear() &&
            date.getUTCMonth() === todaysDate.getMonth() &&
            date.getUTCDate() === todaysDate.getDate()
        );
    });


    const hours = day.hours.filter(hour => {
        const localTime = hour.datetime.split(':');
        const localHour = parseInt(localTime[0]);
        const currentLocalHour = todaysDate.getHours();
        // want current hour and next 5 hours
        return localHour >= currentLocalHour && localHour <= (currentLocalHour + 5);

    })

    console.log(hours);
    return hours;

}




