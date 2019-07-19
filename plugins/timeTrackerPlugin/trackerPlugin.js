/**
 * uptoDate time tracker plugin
 * Helper methods when creating a time tracker.
 * @param {*} uptoDate - the uptoDate class
 * @param {*} options - optional plugin options
 * @version 0.1.0
 */
'use strict'

function timeTrackerPlugin(uptoDate, options) {

    // get time started and time stopped
    uptoDate.timeStarted;
    uptoDate.timeCurrent;
    uptoDate.timePaused;

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

        // get difference if tracker is paused
        const pauseDiff = this.getTimeDifference(this.timePaused, this.timeCurrent);

        const timeObj = {
            date: date,
            time: difference,
            paused: pauseDiff,
            string: difference.days + ' Days ' + difference.hours + ' Hours ' + difference.minutes + ' Minutes ' + difference.seconds + ' Seconds ',
            pausedString: pauseDiff.days + ' Days ' + pauseDiff.hours + ' Hours ' + pauseDiff.minutes + ' Minutes ' + pauseDiff.seconds + ' Seconds ',
        }
        
        return timeObj;

    }


    /**
     * pause  
     * pause the tracker
     * @method uptoDate.pause
     * @type {function} 
     * @returns {object} - returns the paused time from Date().getTime();
     */
    uptoDate.prototype.pause = function() {
        this.timePaused = new Date().getTime();

        return this.timePaused;
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
        this.timePaused = null;

        return stopObj;
    }


}