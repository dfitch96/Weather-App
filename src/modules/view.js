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

export function displayCurrentConditions(weather){

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



    const conditionsIcon = document.createElement("img");
    conditionsIcon.src = icons[weather.currentConditions.icon];

    currentConditionsBody.appendChild(conditionsIcon);

    const tempText = document.createElement("p");
    tempText.textContent = `${weather.currentConditions.temp} °F`;
    currentConditionsBody.appendChild(tempText);

    const conditionsText = document.createElement("p");
    conditionsText.textContent = `${weather.currentConditions.conditions}`;
    currentConditionsBody.appendChild(conditionsText);

    const divider = document.createElement("hr");
    divider.classList.add("dotted");
    currentConditionsBody.appendChild(divider);

    const descriptionText = document.createElement("p");
    descriptionText.textContent = `${weather.days[0].description}`;
    currentConditionsBody.appendChild(descriptionText);

    gridItemCurrentConditions.appendChild(currentConditionsBody);
    containerGrid.appendChild(gridItemCurrentConditions);

}


export function displayWeeklyConditions(weather){

    const mainGridItemWeeklyConditions = document.createElement("div");
    mainGridItemWeeklyConditions.setAttribute("id", "grid-item-weekly-conditions");

    for(const day of weather.days){
        const weeklyConditionsItem = document.createElement("div");
        weeklyConditionsItem.classList.add("weekly-conditions-item");

        const date = new Date(day.datetime);
        const itemHeader = document.createElement("div");
        itemHeader.classList.add("item-header");
        itemHeader.textContent = daysOfWeek[date.getDay()];
        
        weeklyConditionsItem.appendChild(itemHeader);

        const itemIcon = document.createElement("img");
        itemIcon.src = icons[day.icon];
        weeklyConditionsItem.appendChild(itemIcon);

        const itemInfo = document.createElement("div");
        itemInfo.classList.add("item-info");

        const tempPara = document.createElement("p");
        tempPara.textContent = `${day.temp} °F`;
        itemInfo.appendChild(tempPara);

        const conditionsPara = document.createElement("p");
        conditionsPara.textContent = day.conditions;
        itemInfo.appendChild(conditionsPara);

        weeklyConditionsItem.appendChild(itemInfo);


        mainGridItemWeeklyConditions.appendChild(weeklyConditionsItem);
    }

    containerGrid.appendChild(mainGridItemWeeklyConditions);



}