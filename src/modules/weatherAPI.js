

const KEY = 'D7HZ9NJBPMCSGR9BYN6XTRJGP';
const GEO_KEY = 'PuYzeRj0TInMU5uuZwi9SKoCzGjwYlw9';
const URL = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline';
const GEO_URL = `https://api.geocodify.com/v2/reverse?api_key=${GEO_KEY}&`;


export async function fetchWeather(location){

    fetch(`${URL}/${location}?key=${KEY}&unitGroup=us`, {mode: 'cors'})
        .then(response => {
            console.log(response);
            if (!response.ok){
                console.log(`Request failed with status: ${response.status} (${response.statusText})`)
                throw new Error(`Failed to fetch weather data`);
            } 

            return response.json();
            
        })
        .then(response => {
            return response;
        })
        .catch(err => {
            console.log(err);
        })

}



export async function asyncFetchWeather(location, units){

   
    const response = await fetch(`${URL}/${location}?key=${KEY}&unitGroup=${units}`, {mode: 'cors'});
    if(!response.ok){
        console.log(`Request failed with status: ${response.status} (${response.statusText})`)
        throw new Error(`Failed to fetch weather data`);
    }
    const responseJSON = await response.json();
    console.log(responseJSON);
    return responseJSON;
    
}


export async function fetchLocation(lat, lng){

    try{
        const response = await fetch(`${GEO_URL}&lat=${lat}&lng=${lng}`, {mode: 'cors'});
       
        if(!response.ok){
            console.log(`Request failed with status: ${response.status} (${response.statusText})`)
            throw new Error(`Failed to fetch location name`);
        }
        const responseJSON = await response.json();
        const properties = responseJSON.response.features[0].properties;
        return `${properties.locality}, ${properties.region}, ${properties.country}`;
        
    } catch (e){
        throw e
    }
    


}