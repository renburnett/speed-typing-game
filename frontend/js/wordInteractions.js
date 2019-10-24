document.addEventListener('DOMContentLoaded', () => {
  startGame();
  playerTypesWord();
});

const ALL_WORDS = {};
let TIMER_ID;
let WORD_POPULATION_ID;

function startGame () {
  const startBtn = document.getElementById('start-button');

  startBtn.addEventListener('click', () => {
    startBtn.classList.add('hidden');
    document.getElementById('leaderboard-window').classList.add('hidden');
    document.getElementById('game-over-header').classList.add('hidden');

    createNewRun()
      .then(resp => resp.json())
      .then(run => {
        game.run = run;
        game.wordsSeen = [];
        game.wordsTyped = [];
        game.score = 0;
        game.typos = 0;
        game.turns = 0;
        game.difficulty = 14;

        loadWordsFromApi();
        loadGameWindowItems();
      });
  });
}

function createNewRun () {
  return fetch('http://localhost:3000/runs', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({
      account_id: game.account.id,
      score: 0,
      words_typed: [],
      words_seen: []
    })
  });
}

function loadWordsFromApi () {
  fetch('http://localhost:3000/word_banks')
    .then(resp => resp.json())
    .then(wordsList => {
      for (const word of wordsList) {
        ALL_WORDS[word.id] = word.word;
      }
    })
    .then(() => {
      for (let i = 0; i < 3; i++) {
        chooseRandomWord();
      }
    })
    .then(populateWords);
}

function chooseRandomWord () {
  const keys = Object.keys(ALL_WORDS);
  const location = Math.floor(Math.random() * keys.length);
  const randomWord = ALL_WORDS[keys[location]];
  addWordToPage(randomWord);
  game.wordsSeen.push(randomWord);
  delete ALL_WORDS[keys[location]];
}

function addWordToPage (word) {
  const wordsToTypeUl = document.getElementById('words-to-type');
  const li = document.createElement('li');
  li.innerText = word;
  li.classList.add('untyped');
  li.classList.add('no-bullets');
  wordsToTypeUl.append(li);

  const randVal = Math.floor(Math.random() * MOVEMENT.length);
  MOVEMENT[randVal](li);
}

function loadGameWindowItems () {
  document.getElementById('word-submission-div').classList.remove('hidden');
  document.getElementById('typo-alert').classList.remove('hidden');
  document.getElementById('game-timer-div').classList.remove('hidden');
  document.getElementById('game-score-div').classList.remove('hidden');
  TIMER_ID = setInterval(incrementTimerOnScreen, 1000);
}

function incrementTimerOnScreen () {
  const startTime = new Date(game.run.created_at);
  const currentTime = new Date();
  const timeDiff = currentTime - startTime;

  updateTimeOnScreen(calculateTime(timeDiff, 1000), document.getElementById('seconds'));
  updateTimeOnScreen(calculateTime(timeDiff, 60000), document.getElementById('minutes'));
}

function calculateTime (timeSinceStart, millisecondsDivisor) {
  return Math.floor((timeSinceStart) / millisecondsDivisor) % 60;
}

function updateTimeOnScreen (time, timeContainer) {
  time < 10 ? timeContainer.textContent = '0' + time : timeContainer.textContent = time;
}

function populateWords () {
  WORD_POPULATION_ID = setInterval(populateWordsIfActive, 100);
}

function populateWordsIfActive () {
  game.turns++;
  // Every 5 seconds, increase word spawn rate by .1 seconds
  if (game.turns % 60 === 0 && game.difficulty > 2) {
    game.difficulty -= 2;
  }
  if (game.turns % game.difficulty === 0) {
    chooseRandomWord();
  }
  if (Object.keys(ALL_WORDS).length === 0) {
    gameOver();
  }
}

function playerTypesWord () {
  const typingForm = document.getElementById('word-submission-form');
  typingForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const typedSubmission = typingForm['player-input'].value;

    if (removeWordFromPage(typedSubmission)) {
      game.wordsTyped.push(typedSubmission);
      game.score += typedSubmission.length;
      document.getElementById('score').textContent = game.score;
    } else {
      game.typos++;
      game.score -= typedSubmission.length;
      document.getElementById('score').textContent = game.score;
      alertTypo(typedSubmission);
    }
    if (game.typos > 2) {
      gameOver();
    }
    typingForm['word-entered'].value = '';
  });
}

function alertTypo (typedSubmission) {
  const allTyposDiv = document.getElementById('typo-alert');
  const thisTypoDiv = document.createElement('div');
  thisTypoDiv.classList.add('alert', 'alert-warning');
  const h4 = document.createElement('h4');
  const span = document.createElement('span');

  h4.textContent = `TYPO: "${typedSubmission}" is not a valid entry!`;

  let lives = 'lives';
  if (game.typos === 2) { lives = 'life'; }
  span.textContent = `You have ${3 - game.typos} ${lives} remaining.`;

  thisTypoDiv.append(h4, span);
  allTyposDiv.appendChild(thisTypoDiv);
  setTimeout(removeTypoAlert, 2500);
}

function removeTypoAlert () {
  const allTyposDiv = document.getElementById('typo-alert');
  if (allTyposDiv.firstElementChild) {
    allTyposDiv.removeChild(allTyposDiv.firstElementChild);
  }
}

function gameOver () {
  updateRun();

  document.getElementById('game-over-header').classList.remove('hidden');
  document.getElementById('start-button').classList.remove('hidden');

  document.getElementById('word-submission-div').classList.add('hidden');
  document.getElementById('words-to-type').innerHTML = '';
  clearInterval(WORD_POPULATION_ID);
  resetTimer();
  resetScore();
  resetTyposAlert();
}

function updateRun () {
  return fetch(`http://localhost:3000/runs/${game.run.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({
      account_id: game.account.id,
      score: game.score,
      words_typed: game.wordsTyped.join(', '),
      words_seen: game.wordsSeen.join(', ')
    })
  })
    .then(leaderboard.fetchUsers);
}

function resetTyposAlert () {
  const allTyposDiv = document.getElementById('typo-alert');
  allTyposDiv.classList.add('hidden');
  while (allTyposDiv.firstElementChild) {
    allTyposDiv.removeChild(allTyposDiv.firstElementChild);
  }
}

function resetTimer () {
  document.getElementById('game-timer-div').classList.add('hidden');
  clearInterval(TIMER_ID);
  document.getElementById('seconds').textContent = '00';
  document.getElementById('minutes').textContent = '00';
}

function resetScore () {
  document.getElementById('game-score-div').classList.add('hidden');
  document.getElementById('score').textContent = '0';
}

function removeWordFromPage (submission) {
  const wordsOnPage = document.getElementsByClassName('untyped');
  for (const word in wordsOnPage) {
    if (submission === wordsOnPage[word].textContent) {
      wordsOnPage[word].remove();
      return true;
    }
  }
  return false;
}
