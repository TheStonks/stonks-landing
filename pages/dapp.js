const targetDate = new Date('2022-02-06T20:00:00.000Z');

const secondsNumber = document.querySelector('.timer__span--seconds .timer__number');
const minutesNumber = document.querySelector('.timer__span--minutes .timer__number');
const hoursNumber = document.querySelector('.timer__span--hours .timer__number');
const daysNumber = document.querySelector('.timer__span--days .timer__number');


function refreshTimer() {
    let diff = targetDate - new Date();

    if (diff < 0) {
        location.href = '/pages/guide';
    }
    
    diff = Math.floor(diff / 1000);
    const seconds = diff % 60;
    
    diff = Math.floor(diff / 60);
    const minutes = diff % 60;

    diff = Math.floor(diff / 60);
    const hours = diff % 24;

    diff = Math.floor(diff / 24);
    const days = diff;

    secondsNumber.innerText = seconds.toString().padStart(2, '0');
    minutesNumber.innerText = minutes.toString().padStart(2, '0');
    hoursNumber.innerText = hours.toString().padStart(2, '0');
    daysNumber.innerText = days;
}

refreshTimer();
setInterval(() => refreshTimer(), 500);