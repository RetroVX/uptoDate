# Countdown Plugin

* ```450 bytes``` minified
* ```280 bytes``` minfied & gzipped

### Install
HTML
```html
<!-- Make sure the plugin is added after uptoDate.js-->
<script type="text/javascript" src="path/to/countdownPlugin.min.js"></script>
```
Javascript
```javascript
uptoDate.addPlugin(countdownPlugin);
```


### Countdown
```javascript
// input date to countdown to with an optional from date
utDate.countdown(date, fromDate);

// Example
const countdownDate = new Date();
const fromDate = utDate.subtract('hours', 2);
// update every second
setInterval(function(){
    utDate.countdown(countdownDate, fromDate);
}, 1000);
// returns object with two parameters
// time: { days: 0, hours: 2, minutes: 0, seconds: 0}
// string: '0 Days 2 Hours 0 Minutes 0 Seconds'
```