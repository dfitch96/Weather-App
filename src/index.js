import "./styles.css";

import {fetchWeather, asyncFetchWeather} from './modules/weatherAPI.js';
import {Weather} from './modules/weather.js';
import {displayPage} from "./modules/view.js";





const App = function(){
    
    let weatherObj;
    let unitGroup = {
        F: "us",
        C: "metric"
    }
    let currentUnit = "F"


    const form = document.querySelector("header > form");
    const search = form.querySelector("input#input-search");
    const toggleUnit = document.querySelector("#toggle-unit");

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

    toggleUnit.addEventListener("click", (event) => {

        if (currentUnit === "F"){
            toggleUnit.textContent = "°C"
            currentUnit = "C"
        } else{
            toggleUnit.textContent = "°F"
            currentUnit = "F"
        }

        getWeather(weatherObj.address);


    })
    

    const getWeather = (async (location) => {
        try{
            const response = await asyncFetchWeather(location, unitGroup[currentUnit]);
            weatherObj = process(response);
            let hourly = getHourlyData(weatherObj);
            displayPage(weatherObj, hourly, currentUnit);
        } catch (e){
            console.log(e);
        }
        
    
    });

    function process(response){
        return new Weather(response.resolvedAddress, response.alerts, response.currentConditions, response.days, response.description);
    }
    

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
    
        return hours;
    
    }
    
    

}();









