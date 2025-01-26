

const KEY = 'D7HZ9NJBPMCSGR9BYN6XTRJGP';
const URL = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline';


export async function fetchWeather(location){

    fetch(`${URL}/${location}?key=${KEY}`, {mode: 'cors'})
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



export async function asyncFetchWeather(location){

    try{
        const response = await fetch(`${URL}/${location}?key=${KEY}`, {mode: 'cors'});
      
        if(!response.ok){
            console.log(`Request failed with status: ${response.status} (${response.statusText})`)
            throw new Error(`Failed to fetch weather data`);
        }

        const responseJSON = await response.json();
        
        return responseJSON;
    } catch(err){
        return err;
    }
   


}