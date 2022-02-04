const players = document.querySelectorAll('.player');

function togglePlay(videoNode, playNode, play = null) {
    console.log(videoNode, playNode);

    if (play === null) {
        if (videoNode.paused) videoNode.play();
        else videoNode.pause();
    }
    else {
        if (play) videoNode.play();
        else videoNode.pause();
    }

    playNode.classList.toggle('paused', videoNode.paused);
}


if (navigator.userAgentData && !navigator.userAgentData.mobile) {
    players.forEach((player) => {
        if (player.getAttribute('data-autoplay') === 'true') {
            togglePlay(
                player.querySelector('video'),
                player.querySelector('.player__play'),
                true
            );
        }
    });
}


players.forEach((player) => {
    const videoNode = player.querySelector('video');
    const playNode = player.querySelector('.player__play');
    const soundNode = player.querySelector('.player__sound');

    videoNode.volume = 0.1;

    soundNode.addEventListener('click', (ev) => {
        videoNode.muted = !videoNode.muted;
        soundNode.classList.toggle('unmuted');
    });

    playNode.addEventListener('click', (ev) => togglePlay(videoNode, playNode));

    videoNode.addEventListener('touchend', (ev) => {
        togglePlay(videoNode, playNode);
        ev.preventDefault();
    });
});