export default class ReservationUtils {

    _dateAvailabilityMap = {};

    constructor() {
        this.initializeCourtAvailabilityMap();
    }
  
    async initializeCourtAvailabilityMap() {
    try {
        // Send a GET request to the backend to fetch the court availability data
        const response = await fetch('http://localhost:8080/courts/court-availability');
        const data = await response.json();

        for (const courtId in data.courtAvailabilityMap) {
            const courtDates = data.courtAvailabilityMap[courtId];
            for (const date in courtDates) {
            const availabilityForDate = courtDates[date];
            for (const entry of availabilityForDate) {
                const startTime = this.convertTZ(entry.startTime);
                if (!this._dateAvailabilityMap[startTime]) {
                this._dateAvailabilityMap[startTime] = [];
                }
                this._dateAvailabilityMap[startTime].push(parseInt(courtId, 10));
            }
            }
        }

        console.log(this._dateAvailabilityMap);
    } catch (error) {
        console.error('Error fetching court availability:', error);
    }
    }

    convertTZ(date) {
        return new Date((typeof date === "string" ? new Date(date) : date).toLocaleString("en-US", {timeZone: "US/Eastern"}));   
    }


    isWithinRange(date) {
        const curr = new Date();
        const converted = this.convertTZ(curr);
        const diff = Math.floor((date - converted) / (1000 * 60 * 60 * 24));

        return diff <= 6 && diff >= 0;
    }

    isDateBookable(date) {

        if (this._dateAvailabilityMap[date] && this._dateAvailabilityMap[date].length > 0) {
            return true;
        }
    
        // If no match found, return false
        return true;
    }

    roundMinutes(date) {
        date.setHours(date.getHours() + Math.ceil(date.getMinutes()/60));
        date.setMinutes(0, 0, 0);
        return date;
    }

    formattedDate(date) {
        return date.toLocaleString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true,
        });
    }
}