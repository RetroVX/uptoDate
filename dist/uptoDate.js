/**
 * @author Conor Irwin <https://github.com/RetroVX> 
 * @license {@link http://opensource.org/licenses/MIT|MIT License}
 * uptoDate
 * A tiny time and date helper 'library' 
 * @version 0.5.0
 */
'use strict';

function uptoDate() {

    this.dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    this.today = this.cloneDate(new Date());
    this._locale = 'default';

    // get time started and time stopped
    this.timeStarted;
    this.timeCurrent;
    this.timePaused;

    // check to see if the uptoDate countdown is finished
    this.countdownFinished = false;

    // operaters
    this.operators = {
        '+': function(a, b) { return a + b },
        '-': function(a, b) { return a - b },
    };

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
 * addPlugin    
 * extend uptoDate with a custom plugin
 * @method uptoDate.addPlugin
 * @type {function}
 * @param {function} plugin - the plugin to install
 * @param {*} options - optional options for the plugin
 */
uptoDate.prototype.addPlugin = function(plugin, options) {
    plugin(uptoDate, options);

    return this;
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

    let findDay;
    dayArray.forEach(function(d, index) {
        if(index === day) { return findDay = d };
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

    let findMonth;
    monthArray.forEach(function(m, index) {
        if(index === month) { return findMonth = m };
    });

    if(short) { return findMonth.slice(0, 3); }
    else { return findMonth; }
}


/**
 * getDayOfYear 
 * @method uptoDate.getDayOfYear
 * @type {function}
 * @param {*} [date='new Date()'] - optional input of date.
 * @returns return day in year eg 192
 */
uptoDate.prototype.getDayOfYear = function(date) {
    // start of this year
    const startOfyear = new Date(new Date().getFullYear(), 0, 1);

    // clone date entered
    const newDate = this.cloneDate(date);

    // get the difference between the start of the year and todays date
    const td = this.getTimeDifference(startOfyear, newDate);

    // return the difference in days
    return td.days;
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
        dayOfYear: this.getDayOfYear(date),
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
 * add  
 * Add days, weeks, hours, minutes, seconds or milliseconds to a date
 * @method uptoDate.add
 * @type {function}
 * @param {string} string - 'days', 'hours', 'minutes', 'seconds' or 'milliseconds'
 * @param {number} number - number to add
 * @param {*} date - optional date to use.
 * @returns {number} returns date with added values
 */
uptoDate.prototype.add = function(string, number, date) {

    return this.modify('+', string, number, date);

}


/**
 * subtract  
 * Subtract days, weeks, hours, minutes, seconds or milliseconds to a date
 * @method uptoDate.subtract
 * @type {function}
 * @param {string} string - 'days', 'hours', 'minutes', 'seconds' or 'milliseconds'
 * @param {number} number - number to subtract by
 * @param {*} date - optional date to use.
 * @returns {number} returns date with subtracted values
 */
uptoDate.prototype.subtract = function(string, number, date) {

    return this.modify('-', string, number, date);

}


/**
 * modify  
 * More of an internal function to bundle the logic for add, subtract, multiply, divide
 * @method uptoDate.modify
 * @type {function}
 * @param {string} op - math operator to use
 * @param {string} string - 'days', 'hours', 'minutes', 'seconds' or 'milliseconds'
 * @param {number} number - number to add
 * @param {*} date - optional date to use.
 * @returns {number} returns date with added values
 */
uptoDate.prototype.modify = function(op, string, number, date) {

    if(date === undefined || date === null) { date = new Date(); }

    const newDate = this.cloneDate(date);    
    const operaters = this.operators;


    if(string === 'days') { newDate.setDate(operaters[op](newDate.getDate(), number)); }
    else if(string === 'hours') { newDate.setHours(operaters[op](newDate.getHours(), number)); }
    else if(string === 'minutes') { newDate.setMinutes(operaters[op](newDate.getMinutes(), number)); }
    else if(string === 'seconds') { newDate.setSeconds(operaters[op](newDate.getSeconds(), number)); }
    else if(string === 'milliseconds') { newDate.setMilliseconds(operaters[op](newDate.getMilliseconds(), number)); }

    return newDate;

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


/**
 * isToday     
 * Helper function to check if entered date is today
 * @method uptoDate.isToday
 * @type {function}
 * @param {*} date - date to check against
 * @returns boolean
 */
uptoDate.prototype.isToday = function(date) {
    // get todays date
    const todayDate = new Date();

    // get a copy of the entered date
    const newDate = this.cloneDate(date);

    const td = this.getTimeDifference(newDate, todayDate);

    if(td.days === 0) { return true; }
    else { return false; }
}