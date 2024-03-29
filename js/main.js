/**
 * Basic Example
 */

// start the utDate
const utDate = new uptoDate();
utDate.addPlugin([timeTrackerPlugin, countdownPlugin, queryPlugin, relativeTimePlugin, startOfPlugin]);

const start = utDate.start();

// init 5 minutes for timeIn
const newDateIn = new Date();
const dateIn = utDate.add('minutes', 5, newDateIn);

// get ids to populate
// title tag
let title = document.getElementsByTagName('title')[0];

// on mouse over events for title, date and time ids
// title
let titleID = document.getElementById('title');
// title mouseover/out events
titleID.addEventListener("mouseover", function(event) {
    event.target.textContent = 'const utDate = new uptoDate();';
}, false);
titleID.addEventListener("mouseout", function(event) {
    event.target.textContent = 'Up To Date';
}, false);

// date
let dateID = document.getElementById('date');
// date mouseover/out events
dateID.addEventListener("mouseover", function(event) {
    event.target.textContent = 'utDate.getLocalDate();';
}, false);
dateID.addEventListener("mouseout", function(event) {
    event.target.textContent = utDate.getLocalDate();
}, false);

// time
let timeID = document.getElementById('time');
// time mouseover/out events
timeID.addEventListener("mouseover", function(event) {
    event.target.textContent = 'utDate.getLocalTime();';
}, false);
timeID.addEventListener("mouseout", function(event) {
    event.target.textContent = utDate.getLocalTime();
}, false);

let startID = document.getElementById('start');
let agoID = document.getElementById('ago');
let inID = document.getElementById('in');
let stopID = document.getElementById('stop');
let timeTID = document.getElementById('timeOnSite');
let countdownID = document.getElementById('countdown');
let buttonID = document.getElementById('toggle');

// helper checks
let isStopped = false;
let timeinCheck = false;

// set date & time
dateID.textContent = utDate.getLocalDate();
timeID.textContent = utDate.getLocalTime();

// start time
startID.textContent = 'Start Time: ' + utDate.getLocalTime();

// update current time every second
setInterval(function(){
 
    // update title
    title.textContent = 'uptoDate ' + utDate.getLocalTime();

    if(!isStopped) {
        let update = utDate.update();
        timeTID.textContent = update.string;
    }
    // 5 minute countdown example
    const countdown = utDate.countdown(dateIn);
    countdownID.textContent = countdown.string;

    // time ago
    const timeago = utDate.timeAgo(start);
    agoID.textContent = timeago;

    // time in
    const timein = utDate.timeIn(dateIn);
    if(timein === 'Now' && !timeinCheck) {
        timeinCheck = true;
        inID.textContent = 'Now';
    }
    else if(!timeinCheck) {
        inID.textContent = timein;
    }


}, 1000);

// button click
buttonID.addEventListener('click', function(){
    if(isStopped) {
        this.textContent = 'STOP';
        utDate.start();
        startID.textContent = 'Start Time: ' + utDate.getLocalTime();
        stopID.textContent = 'End Time: ';
        isStopped = false;
    }
    else {
        this.textContent = 'START';
        isStopped = true;
        utDate.stop();
        stopID.textContent = 'End Time: ' + utDate.getLocalTime();
    }
})