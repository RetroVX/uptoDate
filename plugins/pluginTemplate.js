/**
 * uptoDate plugin template
 * Inspired by days.js
 * @param {*} uptoDate - the uptoDate class
 * @param {*} options - optional plugin options
 */
'use strict'

function uptoDatePluginTemplate(uptoDate, options) {

    // extend uptoDate class example
    uptoDate.prototype.myFunctionName = function(args) {
        const newDate = new Date();
        return newDate;
    }

    // overide existing api example
    const oldDateString = uptoDate.prototype.dateString;

    uptoDate.prototype.dateString = function(date) {

        const oldResult = oldDateString(date);

        return oldResult.toString().toUpperCase();
    }
}