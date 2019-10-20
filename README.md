# UptoDate

A tiny time and date helper 'library'

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

### Features
* Clone Date
    * immutable
* Add / Subtract
    * Years, Months, Weeks, Days, Hours, Minutes, Seconds, Milliseconds
* Local Date
    * eg: Sunday, 30 June 2019
* Local Time
    * eg: 20:38:48
* Get Day 
    * eg: Sunday
* Get Month
    * eg: June
* Get Day of Year
    * eg 179
* Format Date
    * eg: 30/6/2019
    * eg: 30/6/19
    * eg: Sunday 30 June 2019
* Format Time
* Set Locale
    eg: 'en-US'
* Plugin System
    * extend uptoDate with your own custom plugins
    * see the plugin folder for examples
* ≈3kb minified
    * without plugins
* ≈1kb minifed & gzipped

### Demo

[https://retrovx.github.io/uptoDate](https://retrovx.github.io/uptoDate)

## Getting Started

### Install

```
git clone https://github.com/RetroVX/uptoDate.git
```
Or download from Zip

Then serve on your favourite local web server :)  

HTML  
```html
<script type="text/javascript" src="path/to/uptoDate.min.js"></script>
```

Javascript
```javascript
const utDate = new uptoDate();
```

## Examples

### Clone Date
```javascript
utDate.cloneDate(date);

// Example:
// Dates are mutable so if we copy the date variable then edit the copy variable, it changes the date variable!
// mutable
const date = new Date(2019, 5, 30, 20, 38);
const copy = date;
// add 5 hours to copy
copy.setHours(copy.getHours() + 5);
// output
console.log(date);
'Mon Jul 01 2019 01:38:00 GMT+0100 (British Summer Time)'
console.log(copy);
'Mon Jul 01 2019 01:38:00 GMT+0100 (British Summer Time)'

// immutable way with cloneDate()
const date = new Date(2019, 5, 30, 20, 38);
const copy = utDate.cloneDate(date);
// add 5 hours to copy
copy.setHours(copy.getHours() + 5);
// output
console.log(date);
'Sun Jun 30 2019 20:38:00 GMT+0100 (British Summer Time)'
console.log(copy);
'Mon Jul 01 2019 01:38:00 GMT+0100 (British Summer Time)'
```

### Modify Years, Months, Weeks, Days, Hours, Minutes, Seconds Or Milliseconds

#### Add
```javascript
// date is optional
utDate.add('hours', 3, date);
// Sun Jun 30 2019 23:38:00 GMT+0100 (British Summer Time)
```

#### Subtract
```javascript
// date is optional
utDate.subtract('years', 3, date);
// Sun Jun 30 2016 20:38:00 GMT+0100 (British Summer Time)
```

#### String Inputs For Add/Subtract
```javascript
'years', 'year', 'months', 'month', 'weeks', 'week' 'day', 'days', 'hours', 'hour', 'minutes', 'minute', 'seconds' 'second', 'milliseconds', 'millisecond'
```

### Get Date
```javascript
// add optional date, locale ('en-US') and/or timezone 
utDate.getLocalDate(date, locale, timezone);
// Sunday, 30 June 2019
```

### Get Time
```javascript
// add optional date, locale ('en-US') and/or timezone 
utDate.getLocalTime(date, locale, timezone);
// 20:38:48
```

### Get Day
```javascript
// add optional date & short length
utDate.formatDay(date, false);
// Sunday || Sun
```

### Get Month
```javascript
// add optional date & short length
utDate.formatMonth(date, false);
// June || Jun
```

### Get Day of Year
```javascript
// enter date
utDate.getDayOfYear(date);
// 179
```

### Get Days in a Month
```javascript
utDate.getDaysInMonth(date);
// 30
```

### Format Date
```javascript
// add optional date
utDate.formatDate(date);
// returns object
{   
    full: 'Sunday, 30 June 2019',
    day: 30, 
    fullDay: 'Sunday', 
    dayOfYear: 179,
    daysInMonth: 30,
    shortDay: 'Sun',
    month: 6, 
    shortMonth: 'Jun', 
    fullMonth: 'June', 
    year: 2019, 
    shortYear: 19,
    iso: '2019-06-30T20:38:00.000Z',
    utc: 'Sun, 30 Jun 2019 20:38:00 GMT'
}
```

### Format Time
```javascript
// add optional date
utDate.formatTime(date);
// returns object
{
    hours: 20,
    minutes: 38,
    seconds: 48,
    ms: 1562011912273
}
```

### Set Locale
```javascript
utDate.setLocale(locale);

// setLocale is chainable
utDate.setLocale('en-US').getLocalDate();
```

### Get Time Difference
```javascript
// input start time and end time using Date() format;
utDate.getTimeDifference(time1, time2);

// Example

const start = new Date();
// after 5 seconds get the time difference between start and date variables
setTimeout(function(){
    const date = new Date();
    utDate.timeDifference(start, date);
    // returns object with days, hours, minutes and seconds parameters
    // this would output { days: 0, hours: 0, minutes: 0, seconds: 5}
}, 5000);
```

### Add Plugin
Look inside the plugins folder to see current plugins. Each one will have a README attached.

HTML
```html
<!-- Make sure the plugin is added after uptoDate.js-->
<script type="text/javascript" src="path/to/plugin.js"></script>
```
Javascript
```javascript
// options is optional
utDate.addPlugin(yourPluginName, options);

// multiple plugins
utDate.addPlugin([yourPluginName, anotherPlugin], options);
```

#### Plugin Template
Look inside the plugin folder to find a plugin template :)

### Basic Example
```javascript
const utDate = new uptoDate();
utDate.addPlugin(countdownPlugin);

const start = new Date();
const countdownTo = utDate.add('minutes', 5);

// run every second
setInterval(function(){
    // the countdown will complete in 5 minutes
    utDate.countdown(countdownTo);

    // time Ago, returns time since started
    utDate.timeAgo(start);
}, 1000);
```

### Pre 1.0.0
Expect breaking changes to the api while under version 1.0.0

### Version 0.8