/**
 * @author Conor Irwin <https://github.com/RetroVX> 
 * @license {@link http://opensource.org/licenses/MIT|MIT License}
 * uptoDate
 * A tiny time and date helper 'library' 
 * @version 0.7.1
 */
'use strict';

function uptoDate() {

    this.dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    this.today = new Date();
    this._locale = 'default';

    // operaters for uptoDate.modify
    this.operators = {
        '+': function(a, b) { return a + b },
        '-': function(a, b) { return a - b },
        '*': function(a, b) { return a * b },
        '/': function(a, b) { return a / b },
    };

    // plugins, holds a reference to plugins installed
    this.plugins = [];

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
 * extend uptoDate with a custom plugin/s
 * @method uptoDate.addPlugin
 * @type {function}
 * @param {function} plugin - the plugin or array of plugins to install
 * @param {*} options - optional options for the plugin
 */
uptoDate.prototype.addPlugin = function(plugin, options) {
    if(Array.isArray(plugin)) { 

        plugin.forEach(function(p, index){
            p(uptoDate, options);
            this.plugins.push({plugin: p, name: p.name});
        }, this)
    }
    else {
        plugin(uptoDate, options);
        this.plugins.push({plugin: plugin, name: plugin.name});
    }

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
 * getLocalDate    
 * @method uptoDate.getLocalDate
 * @type {function}
 * @param {*} [date='new Date()'] - optional input of date.
 * @param {string} [locale='default'] - optional input of locale. Eg: 'en-US'
 * @returns return the local date string for date entered
 */
uptoDate.prototype.getLocalDate = function(date, locale, timezone) {
    if(date === undefined || date === null) { date = new Date(); };
    if(locale === undefined || locale === null) { locale = this._locale };

    this.dateOptions.timeZone = timezone;

    return date.toLocaleDateString(locale, this.dateOptions); 
}


/**
 * getLocalTime  
 * @method uptoDate.getLocalTime
 * @type {function}
 * @param {*} [date='new Date()'] - optional input of date.
 * @param {string} [locale='default'] - optional input of locale. Eg: 'en-US'
 * @returns return the local time string from date entered 
 */
uptoDate.prototype.getLocalTime = function(date, locale, timezone) {
    if(date === undefined || date === null) { date = new Date(); };
    if(locale === undefined || locale === null) { locale = this._locale };


    return date.toLocaleTimeString(locale, {timeZone: timezone}); 
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
        full: this.getLocalDate(date),
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
 * @param {string} string - 'years' 'months' 'weeks' 'days', 'hours', 'minutes', 'seconds' or 'milliseconds'
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
 * @param {string} string - 'years' 'months' 'weeks' 'days', 'hours', 'minutes', 'seconds' or 'milliseconds'
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
 * @param {string} string - 'years' 'months' 'weeks' 'days', 'hours', 'minutes', 'seconds' or 'milliseconds'
 * @param {number} number - number to modify by
 * @param {*} date - optional date to use.
 * @returns {number} returns date with added values
 */
uptoDate.prototype.modify = function(op, string, number, date) {

    if(date === undefined || date === null) { date = new Date(); }

    const newDate = this.cloneDate(date);    
    const operaters = this.operators;

    if(string === 'year' || string === 'years') { newDate.setFullYear(operaters[op](newDate.getFullYear(), number)) }
    else if(string === 'month' || string === 'months') { newDate.setMonth(operaters[op](newDate.getMonth(), number)) }
    else if(string === 'week' || string === 'weeks') { newDate.setDate(operaters[op](newDate.getDate(), (number * 7))); }
    else if(string === 'day' || string === 'days') { newDate.setDate(operaters[op](newDate.getDate(), number)); }
    else if(string === 'hour' || string === 'hours') { newDate.setHours(operaters[op](newDate.getHours(), number)); }
    else if(string === 'minute' || string === 'minutes') { newDate.setMinutes(operaters[op](newDate.getMinutes(), number)); }
    else if(string === 'second' || string === 'seconds') { newDate.setSeconds(operaters[op](newDate.getSeconds(), number)); }
    else if(string === 'millisecond' || string === 'milliseconds') { newDate.setMilliseconds(operaters[op](newDate.getMilliseconds(), number)); }

    return newDate;

}


/**
 * getTimeDifference  
 * get the time difference between start and stop times
 * @method uptoDate.getTimeDifference
 * @type {function}
 * @param {*} start - start time from date
 * @param {*} stop - stop time from date
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