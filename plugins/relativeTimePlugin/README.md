# Relative Time Plugin

* ```800bytes``` minified
* ```320bytes``` minified & gzipped

### Install
HTML
```html
<!-- Make sure the plugin is added after uptoDate.js-->
<script type="text/javascript" src="path/to/relativeTimePlugin.min.js"></script>
```
Javascript
```javascript
uptoDate.addPlugin(relativeTimePlugin);
```

### Time Ago
```javascript
// input Date() format
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
// input Date() format
utDate.timeIn(time);

// Example
// set time 5 mins ahead
const time = utDate.add('minutes', 5);

utDate.timeIn(time);
// returns 'in 5 minutes';
```