const MOVEMENT = [stayWordLeft, stayWordRight, boomerangWordLeft, boomerangWordRight, animateWordSpin, animateWordUp, scaleWordUp, scaleWordDown];

function stayWordLeft (li) {
  const WIDTH = document.getElementById('game-card').clientWidth;
  const HEIGHT = document.getElementById('game-card').clientHeight;

  anime({
    targets: li,
    translateX: -WIDTH / 3,
    duration: 3000
  });
}

function stayWordRight (li) {
  const WIDTH = document.getElementById('game-card').clientWidth;
  const HEIGHT = document.getElementById('game-card').clientHeight;

  anime({
    targets: li,
    translateX: WIDTH / 3,
    duration: 3000
  });
}

function boomerangWordLeft (li) {
  const WIDTH = document.getElementById('game-card').clientWidth;
  const HEIGHT = document.getElementById('game-card').clientHeight;

  anime({
    targets: li,
    translateX: -WIDTH / 5,
    duration: 3000,
    endDelay: 1000,
    direction: 'alternate',
    loop: true
  });
}

function boomerangWordRight (li) {
  const WIDTH = document.getElementById('game-card').clientWidth;
  const HEIGHT = document.getElementById('game-card').clientHeight;

  anime({
    targets: li,
    translateX: WIDTH / 5,
    duration: 3000,
    endDelay: 1000,
    direction: 'alternate',
    loop: true
  });
}

function animateWordSpin (li) {
  const WIDTH = document.getElementById('game-card').clientWidth;
  const HEIGHT = document.getElementById('game-card').clientHeight;

  anime({
    targets: li,
    rotate: '1turn',
    duration: 1400,
    loop: true
  });
}

function animateWordUp (li) {
  const WIDTH = document.getElementById('game-card').clientWidth;
  const HEIGHT = document.getElementById('game-card').clientHeight;

  anime({
    targets: li,
    translateY: -HEIGHT / 4,
    endDelay: 1000,
    direction: 'alternate',
    loop: true
  });
}

function scaleWordUp (li) {
  const WIDTH = document.getElementById('game-card').clientWidth;
  const HEIGHT = document.getElementById('game-card').clientHeight;

  anime({
    targets: li,
    scale: {
      value: 2,
      duration: 1600
    },
    delay: 250, // All properties except 'scale' inherit 250ms delay
    loop: true
  });
}

function scaleWordDown (li) {
  const WIDTH = document.getElementById('game-card').clientWidth;
  const HEIGHT = document.getElementById('game-card').clientHeight;

  anime({
    targets: li,
    scale: {
      value: 0.5,
      duration: 1600
    },
    delay: 250, // All properties except 'scale' inherit 250ms delay
    loop: true
  });
}
