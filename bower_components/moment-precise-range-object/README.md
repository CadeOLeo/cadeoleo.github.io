# moment-precise-range-object

Fork of https://github.com/codebox/moment-precise-range

This is a plugin for the <a href="http://momentjs.com/">moment.js</a> JavaScript library, to display date/time ranges precisely, in an object that can be formatted in human-readable.

If you need the result as a string, go to original https://github.com/codebox/moment-precise-range and using `moment.preciseDiff(moment1, moment2)`

With this plugin the result will be an object, the it's called as:

```
moment.preciseDiffObject(moment1, moment2)`
```

Moment already contains some support for formatting date/time ranges, however it performs a lot of 'rounding' on the result and yields only an approximate description.
In the example below the difference between the 2 dates is 1 month, 2 days, 3 hours, 4 minutes and 5 seconds exactly, however this is simplified to just 'a month' by the momentjs library.

```javascript
var m1 = moment('2014-01-01 12:00:00','YYYY-MM-DD HH:mm:ss');
var m2 = moment('2014-02-03 15:04:05','YYYY-MM-DD HH:mm:ss');
var diff = moment.duration(m1.diff(m2)).humanize(); // 'a month'
```

Using this plugin, we can display the exact difference using the same 2 dates:

```javascript
var m1 = moment('2014-01-01 12:00:00','YYYY-MM-DD HH:mm:ss');
var m2 = moment('2014-02-03 15:04:05','YYYY-MM-DD HH:mm:ss');
// var diff = moment.preciseDiff(m1, m2); // '1 month 2 days 3 hours 4 minutes 5 seconds'
var diff = moment.preciseDiffObject(m1, m2);
// {
//     years: 0,
//     months: 1,
//     days: 2,
//     hours: 3,
//     minutes: 4,
//     seconds: 5
// }
```
