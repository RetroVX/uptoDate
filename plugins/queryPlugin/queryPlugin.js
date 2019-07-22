/**
 * uptoDate query plugin  
 * @param {*} uptoDate - the uptoDate class
 * @param {*} options - optional plugin options
 */
'use strict'

// name of plugin
function queryPlugin(uptoDate, options) {

    /**
     * isPast     
     * Helper function to check if entered date is in the past
     * @method uptoDate.isPast
     * @type {function}
     * @param {*} date - date to check against
     * @returns boolean
     */
    uptoDate.prototype.isPast = function(date) {
        const todayDate = new Date();
        const newDate = this.cloneDate(date);

        const isPast = newDate - todayDate;

        if(isPast < 0) { return true }
        else { return false; }

    }


    /**
     * isFuture     
     * Helper function to check if entered date is in the future
     * @method uptoDate.isFuture
     * @type {function}
     * @param {*} date - date to check against
     * @returns boolean
     */
    uptoDate.prototype.isFuture = function(date) {
        const todayDate = new Date();
        const newDate = this.cloneDate(date);

        if(newDate > todayDate) { return true; }
        else { return false; }

    }


    /**
     * isYearMonthDay     
     * Helper function to check if the two dates entered are the same year, month and day.
     * Used internally for isToday, isTomorrow and isYesterday
     * @method uptoDate.isFuture
     * @type {function}
     * @param {*} date - date to check against
     * @returns object with year, month and day function which return a boolean
     */
    uptoDate.prototype.isYearMonthDay = function(newDate, todayDate) {
        return {
            year: function() {
                if(newDate.getFullYear() === todayDate.getFullYear()) { return true; }
                else { return false; }
            },
            month: function() {
                if(newDate.getMonth() === todayDate.getMonth()) { return true; }
                else { return false; }
            },
            day: function() {
                if(newDate.getDate() === todayDate.getDate()) { return true; }
                else { return false; }
            }
        }
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
        const todayDate = new Date();
        const newDate = this.cloneDate(date);

        const isToday = this.isYearMonthDay(newDate, todayDate);

        if(isToday.year() && isToday.month() && isToday.day()) { return true; }
        else { return false; }
    }


    /**
     * isTomorrow     
     * Helper function to check if entered date is tomorrow
     * @method uptoDate.isTomorrow
     * @type {function}
     * @param {*} date - date to check against
     * @returns boolean
     */
    uptoDate.prototype.isTomorrow = function(date) {
        const tomorrow = this.add('day', 1);
        const newDate = this.cloneDate(date);

        const isTomorrow = this.isYearMonthDay(newDate, tomorrow);
    
        //console.log(newd.day());
        if(isTomorrow.year() && isTomorrow.month() && isTomorrow.day()) { return true; }
        else { return false; }
    }


    /**
     * isYesterday     
     * Helper function to check if entered date was yesterday
     * @method uptoDate.isYesterday
     * @type {function}
     * @param {*} date - date to check against
     * @returns boolean
     */
    uptoDate.prototype.isYesterday = function(date) {
        const yesterday = this.subtract('day', 1);
        const newDate = this.cloneDate(date);

        const isYesterday = this.isYearMonthDay(newDate, yesterday)
        if(isYesterday.year() && isYesterday.month() && isYesterday.day()) { return true; }
        else { return false; }
    }


    /**
     * isWeekend      
     * Helper function to check date entered is a weekend  
     * Warning: This checks to see if the date is a Saturday or Sunday.
     * Some countries only have one day weekends or start the weekend on a Friday.
     * @method uptoDate.isWeekend
     * @type {function}
     * @param {*} date - date to check against
     * @returns boolean
     */
    uptoDate.prototype.isWeekend = function(date) {
        const newDate = this.cloneDate(date);
        const day = newDate.getDay();

        // check for saturday or sunday
        // 0 = sunday
        if(day === 6 || day === 0) {
            return true;
        }
        else { return false; }

    }


    /**
     * isLeapYear      
     * Helper function to check if the year from the entered date is a leap year
     * @method uptoDate.isLeapYear
     * @type {function}
     * @param {*} date - date to check against
     * @returns boolean
     */
    uptoDate.prototype.isLeapYear = function(date) {
        const newDate = this.cloneDate(date);
        const dateYear = newDate.getFullYear();

        // check if leap year depending on if its the 29th of feb
        if(new Date(dateYear, 1, 29).getMonth() === 1) {
            return true;
        }
        else { return false; }

    }


    /**
     * isSame      
     * Helper function to check if the first date is the same as the second date
     * @method uptoDate.isSame
     * @type {function}
     * @param {*} first - date to check if before second date
     * @param {*} second - date to check against
     * @returns boolean
     */
    uptoDate.prototype.isSame = function(first, second) {

        if(first === second) { return true; }
        else { return false; }
    }


    /**
     * isBefore      
     * Helper function to check if the first date is before the second date
     * @method uptoDate.isBefore
     * @type {function}
     * @param {*} first - date to check if before second date
     * @param {*} second - date to check against
     * @returns boolean
     */
    uptoDate.prototype.isBefore = function(first, second) {

        if(first < second) { return true; }
        else { return false; }
    }


    /**
     * isAfter       
     * Helper function to check if the first date is after the second date
     * @method uptoDate.isAfter
     * @type {function}
     * @param {*} first - date to check if after second date
     * @param {*} second - date to check against
     * @returns boolean
     */
    uptoDate.prototype.isAfter = function(first, second) {

        if(first > second) { return true; }
        else { return false; }
    }


    /**
     * isBetween       
     * Helper function to check if the date between two dates
     * @method uptoDate.isBetween
     * @type {function}
     * @param {*} date - date to check against
     * @param {*} dateBetweenMin - min date to check against
     * @param {*} dateBetweenMax - max date to check against
     * @returns boolean
     */
    uptoDate.prototype.isBetween = function(date, dateBetweenMin, dateBetweenMax) {

        if(date > dateBetweenMin && date < dateBetweenMax) { return true; }
        else { return false; }
    }

}