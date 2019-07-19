# Countdown Plugin

### Countdown
```javascript
// input date to countdown to with an optional from date
utDate.countdown(date, fromDate);

// Example

// the time is 13:00 
// countdown to 15:00
// update every second
const countdownDate = new Date();
const fromDate = utDate.subtract('hours', 2);
setInterval(function(){
    utDate.countdown(countdownDate, fromDate);
}, 1000);
// returns object with two parameters
// time: { days: 0, hours: 2, minutes: 0, seconds: 0}
// string: '0 Days 2 Hours 0 Minutes 0 Seconds'
```