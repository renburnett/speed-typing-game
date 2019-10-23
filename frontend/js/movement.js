const MOVEMENT = [stayWordLeft, stayWordRight, boomerangWordLeft, boomerangWordRight, animateWordSpin, animateWordUp, scaleWordUp, scaleWordDown];

function stayWordLeft (li) {
  anime({
    targets: li,
    translateX: '-200px',
    duration: 3000
  });
}

function stayWordRight (li) {
  anime({
    targets: li,
    translateX: '200px',
    duration: 3000
  });
}

function boomerangWordLeft (li) {
  anime({
    targets: li,
    translateX: '-200px',
    duration: 3000,
    endDelay: 1000,
    direction: 'alternate'
  });
}

function boomerangWordRight (li) {
  anime({
    targets: li,
    translateX: '200px',
    duration: 3000,
    endDelay: 1000,
    direction: 'alternate'
  });
}

function animateWordSpin (li) {
  anime({
    targets: li,
    rotate: '1turn',
    duration: 1400
  });
}

function animateWordUp (li) {
  anime({
    targets: li,
    translateY: '-100px',
    endDelay: 1000,
    direction: 'alternate'
  });
}

function scaleWordUp (li) {
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
