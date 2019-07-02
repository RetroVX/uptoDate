/**
 * @author Conor Irwin <https://github.com/RetroVX> 
 * @license {@link http://opensource.org/licenses/MIT|MIT License}
 * uptoDate
 * A tiny time and date helper 'library' 
 * @version 0.2.0
 */
function uptoDate() {

    this.dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    this.today = this.cloneDate(new Date());
    this._locale = 'default';

    // get time started and time stopped
    this.timeStarted;
    this.timeCurrent;

    // check to see if the uptoDate countdown is finished
    this.countdownFinished = false;

}


/**
 * cloneDate  
 * Immutable  
 * @method uptoDate.cloneDate
 * @type {function}
 */
uptoDate.prototype.cloneDate = function(date) {

    return new Date(date.getTime());
}


/**
 * setLocale  
 * chainable function
 * @method uptoDate.setLocale
 * @type {function}
 * @param {string} locale - the locale string to use
 */
uptoDate.prototype.setLocale = function(locale) {
    this._locale = locale;

    return this;
}


/**
 * dateString  
 * @method uptoDate.dateString
 * @type {function}
 * @param {*} [date='new Date()'] - optional input of date.
 * @param {string} [locale='default'] - optional input of locale. Eg: 'en-US'
 * @returns return the local date string for date entered
 */
uptoDate.prototype.dateString = function(date, locale) {
    if(date === undefined || date === null) { date = new Date(); };
    if(locale === undefined || locale === null) { locale = this._locale };

    return date.toLocaleDateString(locale, this.dateOptions); 
}


/**
 * timeString  
 * @method uptoDate.timeString
 * @type {function}
 * @param {*} [date='new Date()'] - optional input of date.
 * @param {string} [locale='default'] - optional input of locale. Eg: 'en-US'
 * @returns return the local time string from date entered 
 */
uptoDate.prototype.timeString = function(date, locale) {
    if(date === undefined || date === null) { date = new Date(); };
    if(locale === undefined || locale === null) { locale = this._locale };


    return date.toLocaleTimeString(locale); 
}


/**
 * formatDay  
 * @method uptoDate.formatDay
 * @type {function}
 * @param {*} [date='new Date()'] - optional input of date.
 * @param {boolean} [short=false] - optional output of short day (3 letters, Sunday -> Sun)
 * @returns return day eg Monday
 */
uptoDate.prototype.formatDay = function(date, short) {
    if(date === undefined || date === null) { date = new Date(); };
    if(short === undefined || short === null) { short = false };

    const day = date.getDay();
    const dayArray = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    const findDay = dayArray.find(function(d, index) {
        if(index === day) { return d };
    })

    if(short) { return findDay.slice(0, 3); }
    else { return findDay; }
}


/**
 * formatMonth 
 * @method uptoDate.formatMonth
 * @type {function}
 * @param {*} [date='new Date()'] - optional input of date.
 * @param {boolean} [short=false] - optional output of short month (3 letters, January -> Jan)
 * @returns return month eg June
 */
uptoDate.prototype.formatMonth = function(date, short) {
    if(date === undefined || date === null) { date = new Date(); };
    if(short === undefined || short === null) { short = false };

    const month = date.getMonth();
    const monthArray = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const findMonth = monthArray.find(function(m, index) {
        if(index === month) { return m };
    });

    if(short) { return findMonth.slice(0, 3); }
    else { return findMonth; }
}


/**
 * formatDate  
 * @method uptoDate.formatDate
 * @type {function}
 * @param {*} [date='new Date()'] - optional input of date.
 * @returns return object with day, month, full year and short year
 */
uptoDate.prototype.formatDate = function(date) {
    if(date === undefined || date === null) { date = new Date(); };

    // convert full year to short year
    // 2019 -> 19
    const convertFullYear = date.getFullYear().toString();
    const shortYear = convertFullYear.slice(2, 4);

    const dateObj = {
        day: date.getDate(),
        fullDay: this.formatDay(date),
        shortDay: this.formatDay(date, true),
        month: date.getMonth(),
        shortMonth: this.formatMonth(date, true),
        fullMonth: this.formatMonth(date),
        fullYear: date.getFullYear(),
        shortYear: shortYear,
        full: this.dateString(date),
        iso: date.toISOString(),
        utc: date.toUTCString()
    }

    return dateObj;
}


/**
 * formatTime  
 * @method uptoDate.formatTime
 * @type {function}
 * @param {*} [date='new Date()'] - optional input of date.
 * @returns return object with hour, minute, second and milliseconds of date
 */
uptoDate.prototype.formatTime = function(date) {
    if(date === undefined || date === null) { date = new Date(); };

    const timeObj = {
        hours: date.getHours(),
        minutes: date.getMinutes(),
        seconds: date.getSeconds(),
        ms: date.getMilliseconds()
    }

    return timeObj;
}


/**
 * start  
 * Get the time now, if started task
 * @method uptoDate.start
 * @type {function}
 * @returns {number} returns Date().getTime();
 */
uptoDate.prototype.start = function() {

    // update timestarted with current time
    this.timeStarted = new Date().getTime();

    return this.timeStarted;
    
}


/**
 * update  
 * Get time updated so we can get difference between start and current
 * @method uptoDate.update
 * @type {function}
 * @returns {object} - returns the updated time and date object
 */
uptoDate.prototype.update = function() {

    // get date
    const date = new Date();

    // update time stopped with current time
    this.timeCurrent = date.getTime();

    // get the time difference between start and stop
    const difference = this.getTimeDifference();

    const timeObj = {
        date: date,
        time: difference,
        string: difference.days + ' Days ' + difference.hours + ' Hours ' + difference.minutes + ' Minutes ' + difference.seconds + ' Seconds '
    }
    
    return timeObj;

}


/**
 * stop  
 * run update and return the date and time. 
 * @method uptoDate.stop
 * @type {function} 
 * @returns {object} - returns the stopped time and date object
 */
uptoDate.prototype.stop = function() {
    const stopObj = this.update();
    this.timeStarted = null;
    this.timeCurrent = null;

    return stopObj;
}


/**
 * getTimeDifference  
 * get the time difference between start and stop times
 * @method uptoDate.getTimeDifference
 * @type {function}
 * @param {*} start - start time from date.getTime()
 * @param {*} stop - stop time from date.getTime()
 */
uptoDate.prototype.getTimeDifference = function(start, stop) {

    if(start === undefined || start === null) { start = this.timeStarted };
    if(stop === undefined || stop === null) { stop = this.timeCurrent };

    // get total seconds between the times
    let delta = Math.abs(start - stop) / 1000;

    // calculate (and subtract) whole days
    let days = Math.floor(delta / 86400);
    delta -= days * 86400;

    // calculate (and subtract) whole hours
    let hours = Math.floor(delta / 3600) % 24;
    delta -= hours * 3600;

    // calculate (and subtract) whole minutes
    let minutes = Math.floor(delta / 60) % 60;
    delta -= minutes * 60;

    // what's left is seconds
    let seconds = delta % 60; 

    const timeObj = {
        days: days,
        hours: hours,
        minutes: minutes,
        seconds: Math.floor(seconds)
    }

    return timeObj;
}


/**
 * countdown  
 * Simple countdown for hours/minutes/seconds
 * @method uptoDate.countdown
 * @type {function}
 * @param {number} hours - the hour of day you want the countdown to end
 * @param {number} minutes - the minute you want the countdown to end
 * @param {number} seconds - the second you want the countdown to end
 * @example
 * // countdown to 8pm
 * .countdown(20, 0, 0);
 */

uptoDate.prototype.countdown = function(hours, minutes, seconds) {
    // get time now
    const start = new Date().getTime();
    // get new date and set time from paramters
    const countdownDate = new Date();
    const countdown = countdownDate.setHours(hours, minutes, seconds);

    // get the difference between the start of the countdown and the end time
    const td = this.getTimeDifference(start, countdown);

    // countdown finished
    if(td.days === 0 && td.hours === 0 && td.minutes === 0 && td.seconds === 0) {
        this.countdownFinished = true;
    }

    if(!this.countdownFinished) {
        const countdownObj = {
            time: td,
            string: td.days + ' Days ' + td.hours + ' Hours ' + td.minutes + ' Minutes ' + td.seconds + ' Seconds '
        }
        return countdownObj;
    }
    else {
        const countdownFinishedObj = {
            string: 'Countdown Finished!',
        }
        
        return countdownFinishedObj;
    }
    
}


/**
 * timeAgo    
 * get a string with 'x time ago' eg: 5 minutes ago
 * @method uptoDate.timeAgo
 * @type {function}
 * @param {*} time - time to check against (requires Date().getTime() format)
 */
uptoDate.prototype.timeAgo = function(time) {
    // get time now
    const date = new Date().getTime();

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
 * @param {*} time - time to check against (requires Date().getTime() format)
 */
uptoDate.prototype.timeIn = function(time) {
    // get time now
    const date = new Date().getTime();

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