import snowIcon from '../images/icons/snow.png';
import rainIcon from '../images/icons/rain.png';
import fogIcon from '../images/icons/fog.png';
import windIcon from '../images/icons/wind.png';
import cloudyIcon from '../images/icons/cloudy.png';
import partlyCloudyDayIcon from '../images/icons/partly-cloudy-day.png';
import partlyCloudyNightIcon from '../images/icons/partly-cloudy-night.png';
import clearDayIcon from '../images/icons/clear-day.png';
import clearNightIcon from '../images/icons/clear-night.png';
import { daysOfWeek } from './weather';


const icons = {
    snow: snowIcon,
    rain: rainIcon,
    fog: fogIcon,
    wind: windIcon,
    cloudy: cloudyIcon,
    'partly-cloudy-day': partlyCloudyDayIcon,
    'partly-cloudy-night': partlyCloudyNightIcon,
    'clear-day': clearDayIcon,
    'clear-night': clearNightIcon,
}


const containerGrid = document.querySelector("#container-grid");


export function displayPage(weatherObj, hours, units){
    displayCurrentConditions(weatherObj, units)
    displayHourlyConditions(hours, units);
    displayWeeklyConditions(weatherObj, units);
    displayAlerts(weatherObj);
}


function displayCurrentConditions(weather, units){

    containerGrid.textContent = "";

    const gridItemCurrentConditions = document.createElement("div");
    gridItemCurrentConditions.setAttribute("id", "grid-item-current-conditions");

    // create header paragraph
    const currentConditionsHead = document.createElement("p");
    currentConditionsHead.textContent = "Weather Today in ";
    const breakElement = document.createElement("br");
    currentConditionsHead.appendChild(breakElement);
    const address = document.createElement("span");
    address.classList.add("bolded-text");
    address.textContent = weather.address;
    currentConditionsHead.appendChild(address);

    gridItemCurrentConditions.appendChild(currentConditionsHead);


    const currentConditionsBody = document.createElement("div");
    currentConditionsBody.setAttribute("id", "current-conditions");

    const descriptionText = document.createElement("p");
    descriptionText.textContent = `${weather.days[0].description}`;
    currentConditionsBody.appendChild(descriptionText);

    const conditionsIcon = document.createElement("img");
    conditionsIcon.src = icons[weather.currentConditions.icon];
    currentConditionsBody.appendChild(conditionsIcon);

    const tempText = document.createElement("p");
    tempText.textContent = `${weather.currentConditions.temp} °${units}`;
    currentConditionsBody.appendChild(tempText);

    

    gridItemCurrentConditions.appendChild(currentConditionsBody);
    containerGrid.appendChild(gridItemCurrentConditions);

}

function displayHourlyConditions(hours, units){
    const currentConditionsBody = document.querySelector("#current-conditions");
    

    for(const hour of hours){
        const divider = document.createElement("hr");
        divider.classList.add("dotted");
        currentConditionsBody.appendChild(divider);

        const timePara = document.createElement("p");
        timePara.textContent = hour.datetime;
        currentConditionsBody.appendChild(timePara);

        const infoDiv = document.createElement("div");

        const icon = document.createElement("img");
        icon.src = icons[hour.icon];
        infoDiv.appendChild(icon);

        const tempPara = document.createElement("p");
        tempPara.textContent = `${hour.temp} °${units}`;
        infoDiv.appendChild(tempPara);

        currentConditionsBody.appendChild(infoDiv);
    }



}

function displayAlerts(weather){
    const alerts = document.createElement("div");
    alerts.setAttribute("id", "grid-item-alerts");
    containerGrid.appendChild(alerts);

}

function displayWeeklyConditions(weather, units){

    const mainGridItemWeeklyConditions = document.createElement("div");
    mainGridItemWeeklyConditions.setAttribute("id", "grid-item-weekly-conditions");

    for(const day of weather.days){

        const weeklyConditionsItem = document.createElement("div");
        weeklyConditionsItem.classList.add("weekly-conditions-item");

        const date = new Date(day.datetime + "T00:00:00Z") ;
        const itemHeader = document.createElement("div");
        itemHeader.classList.add("item-header");
        itemHeader.textContent = daysOfWeek[date.getUTCDay()];
        weeklyConditionsItem.appendChild(itemHeader);

        const itemInfo = document.createElement("div");
        itemInfo.classList.add("item-info");

        const conditionsPara = document.createElement("p");
        conditionsPara.textContent = day.conditions;
        itemInfo.appendChild(conditionsPara);

        const itemIcon = document.createElement("img");
        itemIcon.src = icons[day.icon];
        itemInfo.appendChild(itemIcon);

        const tempPara = document.createElement("p");
        tempPara.textContent = `${day.temp} °${units}`;
        itemInfo.appendChild(tempPara);

        weeklyConditionsItem.appendChild(itemInfo);
        mainGridItemWeeklyConditions.appendChild(weeklyConditionsItem);
    }

    containerGrid.appendChild(mainGridItemWeeklyConditions);



}