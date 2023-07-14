import moment from "moment-timezone";

export default class ReservationUtils {

    static convertTZ(date, tzString) {
        return new Date((typeof date === "string" ? new Date(date) : date).toLocaleString("en-US", {timeZone: tzString}));   
    }


    static isWithinRange(date) {
        const curr = new Date();
        const converted = this.convertTZ(curr, "US/Eastern");
        const diff = Math.floor((date - converted) / (1000 * 60 * 60 * 24));

        return diff <= 6 && diff >= 0;
    }

    static isDateBookable(date) {
        // TODO send request to backend to check if time available
        return true; 
    }
}