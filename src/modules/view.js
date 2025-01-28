import snowIcon from '../images/icons/snow.png';
import rainIcon from '../images/icons/rain.png';
import fogIcon from '../images/icons/fog.png';
import windIcon from '../images/icons/wind.png';
import cloudyIcon from '../images/icons/cloudy.png';
import partlyCloudyDayIcon from '../images/icons/partly-cloudy-day.png';
import partlyCloudyNightIcon from '../images/icons/partly-cloudy-night.png';
import clearDayIcon from '../images/icons/clear-day.png';
import clearNightIcon from '../images/icons/clear-night.png';


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
    conditionsIcon.src = icons[weather.days[0].icon];

    currentConditionsBody.appendChild(conditionsIcon);

    const tempText = document.createElement("p");
    tempText.textContent = `${weather.days[0].temp} °F`;
    currentConditionsBody.appendChild(tempText);

    const conditionsText = document.createElement("p");
    conditionsText.textContent = `${weather.days[0].conditions}`;
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