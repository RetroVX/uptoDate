UptoDate Changelog

### Version 0.5.0

* created an extendable plugin system so the core api stays small.
    * example template inside the plugin folder
* addPlugin
    * plugins to add or overide uptoDate methods
* created time tracker as an optional plugin instead of removing

### Version 0.4.0

* add
    * days, hours, minutes, seconds, milliseconds
* subtract
    * days, hours, minutes, seconds, milliseconds
* modify
    * modify allows adding, subtracting, multiplying and dividing dates and times
* depreciating tracker functions before version 1.0.0
    * should be remade as an example or plugin instead.

### Version 0.3.0

* pause
    * new pause function for the tracker
* tracker now outputs time paused with overall time
    * 0 days, 2 hours, 0 minutes, 0 seconds
* isToday
    * returns boolean to check if entered date is today
* getDayOfYear
    * returns day since the start of the year
* formatDate
    * dayOfYear added
* replaced the Array.find methods with Array.forEach for IE 11 support

### Version 0.2.0

* setLocale
    * chainable
* formatDate
    * new objects -
    * iso
    * utc
    * full
* cloneDate
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
