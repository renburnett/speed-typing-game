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

        loadWordsFromApi();
        loadEntryForm();
        loadTimer();
        populateWords();
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
    });
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
  wordsToTypeUl.append(li);
}

function loadEntryForm () {
  const typingFormDiv = document.getElementById('word-submission-div');
  typingFormDiv.classList.remove('hidden');
}

function loadTimer () {
  const gameTimerDiv = document.getElementById('game-timer-div');
  gameTimerDiv.classList.remove('hidden');
  TIMER_ID = setInterval(incrementTimerOnScreen, 1000);
}

function incrementTimerOnScreen () {
  const seconds = document.getElementById('seconds');
  const minutes = document.getElementById('minutes');
  const hours = document.getElementById('hours');

  const startTime = new Date(game.run.created_at);
  const currentTime = new Date();

  const secs = Math.floor((currentTime - startTime) / 1000) % 60;
  secs < 10 ? seconds.textContent = '0' + secs : seconds.textContent = secs;
  const mins = Math.floor((currentTime - startTime) / 60000) % 60;
  mins < 10 ? minutes.textContent = '0' + mins : minutes.textContent = mins;
  const hrs = Math.floor((currentTime - startTime) / 360000) % 24;
  hrs < 10 ? hours.textContent = '0' + hrs : hours.textContent = hrs;
}

function populateWords () {
  WORD_POPULATION_ID = setInterval(populateWordsIfActive, 1000);
}

function populateWordsIfActive () {
  if (Object.keys(ALL_WORDS).length === 0) {
    gameOver();
  } else {
    chooseRandomWord();
  }
}

function playerTypesWord () {
  const typingForm = document.getElementById('word-submission-form');
  typingForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const typedSubmission = typingForm['player-input'].value;

    if (removeWordFromPage(typedSubmission)) {
      game.wordsTyped.push(typedSubmission);
    } else {
      game.typos++;
    }
    if (game.typos > 2) {
      gameOver();
    }
    typingForm['word-entered'].value = '';
  });
}

function gameOver () {
  updateRun();

  document.getElementById('game-over-header').classList.remove('hidden');
  document.getElementById('start-button').classList.remove('hidden');

  document.getElementById('word-submission-div').classList.add('hidden');
  document.getElementById('words-to-type').innerHTML = '';
  resetTimer();
  clearInterval(WORD_POPULATION_ID);
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
  });
}

function resetTimer () {
  document.getElementById('game-timer-div').classList.add('hidden');
  clearInterval(TIMER_ID);
  document.getElementById('seconds').textContent = '00';
  document.getElementById('minutes').textContent = '00';
  document.getElementById('hours').textContent = '00';
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
