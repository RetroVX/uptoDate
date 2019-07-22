/**
 * uptoDate relative time plugin  
 * time ago, time in
 * @param {*} uptoDate - the uptoDate class
 * @param {*} options - optional plugin options
 */
'use strict'

// name of plugin
function relativeTimePlugin(uptoDate, options) {

    /**
     * timeAgo    
     * get a string with 'x time ago' eg: 5 minutes ago
     * @method uptoDate.timeAgo
     * @type {function}
     * @param {*} time - time to check against
     */
    uptoDate.prototype.timeAgo = function(time) {
        // get time now
        const date = new Date();

        // get the difference between now and time entered
        const td = this.getTimeDifference(time, date);

        let timeago;

        // update depending on time passed
        // checks to see if the time is at 1 so it does not display 1 seconds ago etc
        if(td.days === 1) { timeago = td.days + ' day ago'; }
        else if(td.days > 1) { timeago = td.days + ' days ago'; }
        else if(td.hours === 1) { timeago = td.hours + ' hour ago'; }
        else if(td.hours > 1) { timeago = td.hours + ' hours ago'; }
        else if(td.minutes === 1) { timeago = td.minutes + ' minute ago'; }
        else if(td.minutes > 1) { timeago = td.minutes + ' minutes ago'; }
        else if(td.seconds === 1) { timeago = td.seconds + ' second ago'; }
        else if(td.seconds > 1) { timeago = td.seconds + ' seconds ago'; }
        else { timeago = 'Just now'}

        return timeago;
    }


    /**
     * timeIn     
     * get a string with 'in x time' eg: in 5 minutes
     * @method uptoDate.timeIn
     * @type {function}
     * @param {*} time - time to check against
     */
    uptoDate.prototype.timeIn = function(time) {
        // get time now
        const date = new Date();

        // get the difference between now and time entered
        const td = this.getTimeDifference(date, time);

        let timein;

        // update depending on time passed
        // checks to see if the time is at 1 so it does not display in 1 seconds etc
        if(td.days === 1) { timein = 'in ' + td.days + ' day'; }
        else if(td.days > 1) { timein = 'in ' + td.days + ' days'; }
        else if(td.hours === 1) { timein = 'in ' +  td.hours + ' hour'; }
        else if(td.hours > 1) { timein = 'in ' + td.hours + ' hours'; }
        else if(td.minutes === 1) { timein = 'in ' + td.minutes + ' minute'; }
        else if(td.minutes > 1) { timein = 'in ' + td.minutes + ' minutes'; }
        else if(td.seconds === 1) { timein = 'in ' + td.seconds + ' second'; }
        else if(td.seconds > 1) { timein = 'in ' + td.seconds + ' seconds'; }
        else { timein = 'Now'}

        return timein;
    }
}