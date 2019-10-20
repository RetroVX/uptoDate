UptoDate Changelog

### Version 0.8

* new function ```getDaysInMonth``` that returns the number days in a month
* ```formatDate```
    * replaced getFullYear property with year
    * added daysInMonth property

### Version 0.7.1

* new plugin ```startOfPlugin```
    * ```startOf```
    * ```startOfDay```
    * ```startOfWeek```
    * ```startOfMonth```
    * ```startOfYear```

### Version 0.7.0

* moved ```isToday``` into the ```queryPlugin```
* moved ```timeAgo``` and ```timeIn``` into a new plugin called ```relativeTimePlugin```
* new plugin ```queryPlugin```
    * ```isToday```
    * ```isYesterday```
    * ```isTomorrow```
    * ```isWeekend```
    * ```isPast```
    * ```isFuture```
    * ```isLeapYear```
    * ```isSame```
    * ```isBefore```
    * ```isAfter```
    * ```isBetween```
* new plugin ```relativeTimePlugin```
    * ```timeAgo```
    * ```timeIn```

### Version 0.6.1

* minor bug fixes and corrections

### Version 0.6.0

* ```countdown``` re-created as a plugin to keep the core api size small.
    * instead of entering an hour, minute, second, you now add a date instead.
* ```addPlugin```
    * now accepts an array of plugins in the first parameter
* ```uptoDate.plugins``` array which holds references to any plugins installed for uptoDate
* timezone support for ```getLocalDate``` and ```getLocalTime```
* ```add```/```subtract```/```modify```
    * now you can use 'day' || 'days' etc instead of just 'days'
    * years, months and weeks can now be added or subtracted
* ```dateString``` has been renamed to ```getLocalDate```
* ```timeString``` has been renamed to ```getLocalTime```
* minor clean up of uptoDate.js, Changelog and Readme

### Version 0.5.0

* created an extendable plugin system so the core api stays small.
    * example template inside the plugin folder
* ```addPlugin```
    * plugins to add or overide uptoDate methods
* created time tracker as an optional plugin instead of removing

### Version 0.4.0

* ```add```
    * days, hours, minutes, seconds, milliseconds
* ```subtract```
    * days, hours, minutes, seconds, milliseconds
* ```modify```
    * modify allows adding, subtracting, multiplying and dividing dates and times
* depreciating tracker functions before version 1.0.0
    * should be remade as an example or plugin instead.

### Version 0.3.0

* ```pause```
    * new pause function for the tracker
* tracker now outputs time paused with overall time
    * 0 days, 2 hours, 0 minutes, 0 seconds
* ```isToday```
    * returns boolean to check if entered date is today
* ```getDayOfYear```
    * returns day since the start of the year
* ```formatDate```
    * dayOfYear added
* replaced the Array.find methods with Array.forEach for IE 11 support

### Version 0.2.0

* ```setLocale```
    * chainable
* ```formatDate```
    * new objects -
    * iso
    * utc
    * full
* ```cloneDate```
    * immutable clone

### Version 0.1.0

* local date
* local time
* day
* month
* format date
* format time
* time tracker
* countdown
* time ago
* time in
