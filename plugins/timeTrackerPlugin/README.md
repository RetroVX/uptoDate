# Time Tracker Plugin

* ```770 bytes``` minified
* ```330 bytes``` minfied & gzipped

### Install
HTML
```html
<!-- Make sure the plugin is added after uptoDate.js-->
<script type="text/javascript" src="path/to/trackerPlugin.min.js"></script>
```
Javascript
```javascript
uptoDate.addPlugin(timeTrackerPlugin);
```

### Start Time Tracker
```javascript
utDate.start();
// returns Date().getTime();
```

### Pause Time Tracker
```javascript
utDate.pause();
// returns Date().getTime();
```

### Stop Time Tracker
```javascript
utDate.stop();
// returns object with stopped time values
// date: new Date();
// time: { days: 0, hours: 2, minutes: 0, seconds: 0}
// string: ' 0 Days 2 Hours 0 Minutes 0 Seconds'
// will only return the string if the tracker has been paused
// pausedString: ' 0 Days 0 Hours 0 Minutes 0 Seconds'
// paused: { days: 0, hours: 0, minutes: 0, seconds: 0}
```

### Update Time Tracker
```javascript
utDate.update();
// returns object with updated time values
// date: new Date();
// time: { days: 0, hours: 2, minutes: 0, seconds: 0}
// string: ' 0 Days 2 Hours 0 Minutes 0 Seconds'
// will only return the string if the tracker has been paused
// pausedString: ' 0 Days 0 Hours 0 Minutes 0 Seconds'
// paused: { days: 0, hours: 0, minutes: 0, seconds: 0}
```

### Version 0.1.0

### Todo
* Overhaul to make it easier to use