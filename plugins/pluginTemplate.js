/**
 * uptoDate plugin template
 * @param {*} uptoDate - the uptoDate class
 * @param {*} options - optional plugin options
 */
'use strict'

// name of plugin
function uptoDatePluginTemplate(uptoDate, options) {

    // extend uptoDate class example
    uptoDate.prototype.myFunctionName = function(args) {
        const newDate = new Date();
        return newDate;
    }

    // overide existing api example
    const oldDateString = uptoDate.prototype.getLocalDate;

    uptoDate.prototype.getLocalDate = function(date) {

        const oldResult = oldDateString(date);

        return oldResult.toString().toUpperCase();
    }
}