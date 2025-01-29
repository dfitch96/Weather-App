
export class Weather{

    
    constructor(address, alerts, currentConditions, days, description){
        this.address = address;
        this.alerts = alerts;
        this.currentConditions = currentConditions;
        this.days = days;
        this.description = description;
    }

    
}


export const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];