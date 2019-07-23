# Start Of Plugin

* ```870bytes``` minified
* ```325bytes``` minified & gzipped

### Install
HTML
```html
<!-- Make sure the plugin is added after uptoDate.js-->
<script type="text/javascript" src="path/to/startOfPlugin.min.js"></script>
```
Javascript
```javascript
uptoDate.addPlugin(startOfPlugin);
```

### Start Of
```javascript
// string = 'day', 'week', 'month' or 'year'
utDate.startOf(string, date);

// Example
utDate.startOf('year', new Date());
// Tue Jan 01 2019 00:00:00
```

### Start Of Day
```javascript
// input Date() format
utDate.startOfDay(date);

// Example
const date = new Date(2019, 5, 20, 17, 30);

utDate.startOfDay(date);
// Thu Jun 20 2019 00:00:00
```

### Start Of Week
```javascript
// by default week start is monday (1)
utDate.startOfWeek(date, weekStart);

// Example
const date = new Date(2019, 5, 20, 17, 30);

utDate.startOfWeek(date);
// Mon Jun 17 2019 00:00:00
```

### Start Of Month
```javascript
// input date
utDate.startOfMonth(date);

// Example
const date = new Date(2019, 5, 20, 17, 30);

utDate.startOfMonth(date);
// Sat Jun 01 2019 00:00:00
```

### Start Of Year
```javascript
// input date
utDate.startOfYear(date);

// Example
const date = new Date(2019, 5, 20, 17, 30);

utDate.startOfYear(date);
// Tue Jan 01 2019 00:00:00
```
