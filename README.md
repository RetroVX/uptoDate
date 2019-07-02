# UptoDate

A tiny time and date helper 'library'

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

### Features
* Clone Date
    * immutable
* Local Date
    * eg: Sunday, 30 June 2019
* Local Time
    * eg: 20:38:48
* Get Day 
    * eg: Sunday
* Get Month
    * eg: June
* Format Date
    * eg: 30/6/2019
    * eg: 30/6/19
    * eg: Sunday 30 June 2019
* Format Time
* Set Locale
    eg: 'en-US'
* Time Tracking
    * Start & Stop
* Countdown
* Time Ago 
    * eg: 8 minutes ago
* Time In
    * eg: in 8 minutes
* ≈4kb minified
* ≈1kb gzip

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

### Get Date
```javascript
// add optional date or locale ('en-US')
utDate.dateString(date, locale);
// Sunday, 30 June 2019
```

### Get Time
```javascript
// add optional date or locale ('en-US')
utDate.timeString(date, locale);
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

### Format Date
```javascript
// add optional date
utDate.formatDate(date);
// returns object
{   
    full: Sunday, 30 June 2019,
    day: 30, 
    fullDay: Sunday, 
    shortDay: Sun,
    month: 6, 
    shortMonth: Jun, 
    fullMonth: June, 
    fullYear: 2019, 
    shortYear: 19,
    iso: 2019-06-30T20:38:00.000Z,
    utc: Sun, 30 Jun 2019 20:38:00 GMT
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
utDate.setLocale('en-US').dateString();
```

### Start Time Tracker
```javascript
utDate.start();
// returns Date().getTime();
```

### Stop Time Tracker
```javascript
utDate.stop();
// returns object with stopped time values
// date: new Date();
// time: { days: 0, hours: 2, minutes: 0, seconds: 0}
// string: ' 0 Days 2 Hours 0 Minutes 0 Seconds'
```

### Update Time Tracker
```javascript
utDate.update();
// returns object with updated time values
// date: new Date();
// time: { days: 0, hours: 2, minutes: 0, seconds: 0}
// string: ' 0 Days 2 Hours 0 Minutes 0 Seconds'
```

### Get Time Difference
```javascript
// input start time and end time using Date().getTime() format;
// used internally for the update(); and countdown();
utDate.getTimeDifference(time1, time2);

// Example

const start = new Date().getTime();
// after 5 seconds get the time difference between start and date variables
setTimeout(function(){
    const date = new Date().getTime();
    utDate.timeDifference(start, date);
    // returns object with days, hours, minutes and seconds parameters
    // this would output { days: 0, hours: 0, minutes: 0, seconds: 5}
}, 5000);
```

### Countdown
```javascript
// input time (in 23 hour format) to countdown from
utDate.countdown(hour, minute, second);

// Example

// the time is 13:00 
// countdown to 15:00
// update every second
setInterval(function(){
    utDate.countdown(15, 0, 0);
}, 1000);
// returns object with two parameters
// time: { days: 0, hours: 2, minutes: 0, seconds: 0}
// string: '0 Days 2 Hours 0 Minutes 0 Seconds'
```

### Time Ago
```javascript
// input Date().getTime() format
utDate.timeAgo(time);

// Example
const start = new Date().getTime();
// after 5 seconds output time ago string
setTimeout(function(){
    utDate.timeAgo(start);
    // ouputs string with 'x time ago'
    // this would output '5 seconds ago'
}, 5000);
```

### Time In
```javascript
// input Date().getTime() format
utDate.timeIn(time);

// Example
const time = new Date();
// set time 5 mins ahead
time.setMinutes(time.getMinutes() + 5);

utDate.timeIn(time);
// returns 'in 5 minutes';
```

### Basic Example
```javascript
const utDate = new uptoDate();

// start the tracker
const start = utDate.start();

// run every second
setInterval(function(){
    // update the tracker, returns object with time passed
    utDate.update();

    // countdown to 8pm, returns object with time passed
    utDate.countdown(20, 0, 0);

    // time Ago, returns time since started
    utDate.timeAgo(start);
}, 1000);
```

### Version 0.2.0