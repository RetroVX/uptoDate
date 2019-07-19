/**
 * uptoDate countdown plugin
 * Helper method when creating a countdown.
 * @param {*} uptoDate - the uptoDate class
 * @param {*} options - optional plugin options
 * @version 0.5.0
 */
'use strict'

function countdownPlugin(uptoDate, options) {

    // check to see if the uptoDate countdown is finished
    uptoDate.countdownFinished = false;

    /**
     * countdown    
     * Simple countdown between two dates
     * @method uptoDate.countdown
     * @type {function}
     * @param {*} date - date to countdown to
     * @param {*} [fromDate=Date()] - optional date to countdown from
     */
    uptoDate.prototype.countdown = function(date, fromDate) {

        if(fromDate === undefined || fromDate === null) { fromDate = new Date(); }

        const start = this.cloneDate(fromDate)
        // get new date and set time from paramters
        const countdownDate = this.cloneDate(date);

        // get the difference between the start of the countdown and the end time
        const td = this.getTimeDifference(start, countdownDate);

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
}