export default class ReservationUtils {

    convertTZ(date, tz) {
        return new Date((typeof date === "string" ? new Date(date) : date).toLocaleString("en-US", {timeZone: tz}));   
    }


    isWithinRange(date) {
        const curr = new Date();
        const converted = this.convertTZ(curr, "US/Eastern");
        const diff = Math.floor((date - converted) / (1000 * 60 * 60 * 24));

        return diff <= 6 && diff >= 0;
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

    getLocalTimeZone() {
        const options = { timeZoneName: 'long' };
        const formatter = new Intl.DateTimeFormat([], options);
        const timeZoneString = formatter.resolvedOptions().timeZone;
    
        return timeZoneString;
    }
}