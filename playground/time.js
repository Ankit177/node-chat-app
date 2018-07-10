//jan 1st 1970 00:00:00 am
var moment=require('moment');

var date=moment();
date.add(1,'year').subtract(9,'month')
console.log(date.format('MMM Do, YYYY'))