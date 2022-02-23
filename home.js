document.querySelector('.header__hamburger-menu').addEventListener('click', (ev) => {
    ev.target.classList.toggle('checked');
});

document.querySelector('nav').addEventListener('click', (ev) => {
    document.querySelector('.header__hamburger-menu').classList.remove('checked');
});

window.addEventListener('scroll', (ev) => {
    document.querySelector('.header__hamburger-menu').classList.remove('checked');
});

document.querySelector('#donate-address').addEventListener('click', (ev) => {
    navigator.clipboard.writeText(ev.target.innerText);

    ev.target.classList.add('copied');

    setTimeout(() => {
        ev.target.classList.remove('copied');
    }, 2000);
});

const targetDate = new Date('2022-02-28T19:00:00.000Z');
const timerParts = document.querySelectorAll('.bridge-note__timer > span');

if (targetDate > new Date()) {
    document.querySelector('section#bridge-note').style.display = 'flex';
}

function refreshTimer() {
    let diff = Math.floor((targetDate - new Date()) / 1000);
    const s = diff % 60;
    const m = (diff = (diff - s) / 60) % 60;
    const h = (diff = (diff - m) / 60) % 60;
    const d = Math.floor((diff - h) / 24);

    timerParts[0].innerText = d + ' days';
    timerParts[1].innerText = h + ' hours';
    timerParts[2].innerText = m + ' minutes';
    timerParts[3].innerText = s + ' seconds';
}

refreshTimer();
setInterval(() => refreshTimer(), 500);