import moment from "moment-timezone";

export default class ReservationUtils {

    static convertTZ(date) {
        return new Date((typeof date === "string" ? new Date(date) : date).toLocaleString("en-US", {timeZone: "US/Eastern"}));   
    }


    static isWithinRange(date) {
        const curr = new Date();
        const converted = this.convertTZ(curr);
        const diff = Math.floor((date - converted) / (1000 * 60 * 60 * 24));

        return diff <= 6 && diff >= 0;
    }

    static isDateBookable(date) {
        // TODO send request to backend to check if time available
        return true; 
    }

    static roundMinutes(date) {
        date.setHours(date.getHours() + Math.ceil(date.getMinutes()/60));
        date.setMinutes(0, 0, 0);
        return date;
    }

    static formattedDate(date) {
        return date.toLocaleString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true,
        });
    }
}