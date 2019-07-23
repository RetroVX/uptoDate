/**
 * uptoDate start of plugin
 * set the date to the start of the day, week, month, year
 * @param {*} uptoDate - the uptoDate class
 * @param {*} options - optional plugin options
 */
'use strict'

// name of plugin
function startOfPlugin(uptoDate, options) {

    /**
     * startOf  
     * sets the date to the start of x
     * @method uptoDate.startOfDay
     * @type {function}
     * @param {string} string - string to enter. 'day', 'week', 'month' or 'year'
     * @param {*} [date='new Date()'] - optional input of date.
     * @returns returns date with entered start of
     */
    uptoDate.prototype.startOf = function(string, date) {
        if(date === undefined || date === null) { date = new Date(); }

        const newDate = this.cloneDate(date);

        if(string === 'day') { return this.startOfDay(newDate) }
        else if(string === 'week') { return this.startOfWeek(newDate) }
        else if(string === 'month') { return this.startOfMonth(newDate) }
        else if(string === 'year') { return this.startOfYear(newDate) }
    }
    

    /**
     * startOfDay  
     * sets the date entered or today as midnight 
     * @method uptoDate.startOfDay
     * @type {function}
     * @param {*} [date='new Date()'] - optional input of date.
     * @returns returns date entered or today at midnight (start of day)
     */
    uptoDate.prototype.startOfDay = function(date) {
        if(date === undefined || date === null) { date = new Date(); }

        const newDate = this.cloneDate(date);
        newDate.setHours(0, 0, 0, 0);

        return newDate;

    }


    /**
     * startOfWeek   
     * sets the date entered to the start of the week 
     * @method uptoDate.startOfWeek
     * @type {function}
     * @param {*} [date='new Date()'] - optional input of date.
     * @param {number} [weekStart=1] - optional day to start the week, default is Monday
     * @returns returns date entered start of week
     */
    uptoDate.prototype.startOfWeek = function(date, weekStart) {
        if(date === undefined || date === null) { date = new Date(); }
        if(weekStart === undefined || weekStart === null) { weekStart = 1; }

        const newDate = this.cloneDate(date);
        const day = newDate.getDay();

        const startOfWeek = newDate.setDate(newDate.getDate() - day + weekStart);
        
        return this.startOfDay(new Date(startOfWeek));

    }


    /**
     * startOfMonth  
     * sets the date entered to the start of the month 
     * @method uptoDate.startOfMonth
     * @type {function}
     * @param {*} [date='new Date()'] - optional input of date.
     * @returns returns date entered start of month
     */
    uptoDate.prototype.startOfMonth = function(date) {
        if(date === undefined || date === null) { date = new Date(); }

        const newDate = this.cloneDate(date);
        const currentDayInMonth = newDate.getDate();

        const diff = currentDayInMonth - 1;
        const startOfMonth = newDate.setDate(currentDayInMonth - diff);
        
        return this.startOfDay(new Date(startOfMonth));

    }


    /**
     * startOfYear 
     * sets the date entered to the start of the year 
     * @method uptoDate.startOfYear
     * @type {function}
     * @param {*} [date='new Date()'] - optional input of date.
     * @returns returns date entered start of year
     */
    uptoDate.prototype.startOfYear = function(date) {
        if(date === undefined || date === null) { date = new Date(); }

        const newDate = this.cloneDate(date);
        // set date to January
        const setMonth = newDate.setMonth(0);

        // set the date to the first day in the month
        const startOfMonth = this.startOfMonth(newDate);

        return this.startOfDay(new Date(startOfMonth));

    }
}