# Query Plugin

### Install
HTML
```html
<!-- Make sure the plugin is added after uptoDate.js-->
<script type="text/javascript" src="path/to/queryPlugin.min.js"></script>
```
Javascript
```javascript
uptoDate.addPlugin(queryPlugin);
```

### Features
* ```isToday```
* ```isTomorrow```
* ```isYesterday```
* ```isWeekend```
* ```isPast```
* ```isFuture```
* ```isLeapYear```
* ```isSame```
* ```isBefore```
* ```isAfter```
* ```isBetween```
* ```1.20kb``` minified
* ```400bytes``` minified & gzipped

### Docs

```javascript
const utDate = new uptoDate();
```

### isToday
```javascript
// input date
utDate.isToday(date);

// Example
utDate.isToday(new Date());
// returns true
```

### isTomorrow
```javascript
// input date
utDate.isTomorrow(date);

// Example
const tomorrow = utDate.add('day', 1, new Date());
utDate.isTomorrow(tomorrow);
// returns true
```

### isYesterday
```javascript
// input date
utDate.isYesterday(date);

// Example
const yesterday = utDate.subtract('day', 1, new Date());
utDate.isYesterday(yesterday);
// returns true
```

### isWeekend
This checks to see if the date is a Saturday or Sunday.
Some countries only have one day weekends or start the weekend on a Friday.
```javascript
// input date
utDate.isWeekend(date);

// Example
// weekend variable is a Sunday
const weekend = new Date(2019, 5, 30);
utDate.isWeekend(weekend);
// returns true
```

### isPast
```javascript
// input date
utDate.isPast(date);

// Example
const past = utDate.subtract('year', 1, new Date());
utDate.isPast(past);
// returns true
```

### isFuture
```javascript
// input date
utDate.isFuture(date);

// Example
const future = utDate.add('year', 1, new Date());
utDate.isFuture(future);
// returns true
```

### isLeapYear
```javascript
// input date
utDate.isLeapYear(date);

// Example
// 2016 was the last leap year
const leapYear = utDate.subtract('year', 3, new Date());
utDate.isLeapYear(leapYear);
// returns true
```

### isSame
```javascript
// input two dates
utDate.isSame(date, date);

// Example
utDate.isSame(new Date(), new Date());
// returns true
```

### isBefore
```javascript
// input two dates
// checks if the first date is before the second date
utDate.isBefore(date, date);

// Example
const before = utDate.subtract('year', 1, new Date());
utDate.isBefore(before, new Date());
// returns true
```

### isAfter
```javascript
// input two dates
// checks if the first date is after the second date
utDate.isAfter(date, date);

// Example
const after = utDate.add('year', 1, new Date());
utDate.isAfter(after, new Date());
// returns true
```

### isBetween
```javascript
// input three dates
// checks if the first date is after the second date and before the third date
utDate.isBefore(date, dateMin, dateMax);

// Example
const dateMin = utDate.subtract('year', 1, new Date());
const dateMax = utDate.add('year', 1, new Date());

utDate.isBetween(new Date(), dateMin, dateMax);
// returns true
```