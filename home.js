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