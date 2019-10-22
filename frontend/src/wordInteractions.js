document.addEventListener('DOMContentLoaded', () => {
  startGame();
  playerTypesWord();
});

let ALL_WORDS = [];

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
        setInterval(runGameTimer, 1000);
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
    .then(json => ALL_WORDS = json)
    .then(() => {
      for (let i = 0; i < 3; i++) {
        chooseRandomWord();
      }
    });
}

function chooseRandomWord () {
  let location = Math.floor(Math.random() * ALL_WORDS.length);
  let randomWord = ALL_WORDS[location].word;
  while (game.wordsSeen.includes(randomWord)) {
    location = Math.floor(Math.random() * ALL_WORDS.length);
    randomWord = ALL_WORDS[location].word;
  }
  addWordToPage(randomWord);
  game.wordsSeen.push(randomWord);
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
}

function runGameTimer () {
  incrementTimerOnScreen();
  chooseRandomWord();
}

function incrementTimerOnScreen () {
  const seconds = document.getElementById('seconds');
  let time = parseInt(seconds.textContent, 10);
  time += 1;
  if (time < 10) {
    seconds.textContent = '0' + time;
  } else if (time < 60) {
    seconds.textContent = time;
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
      gameOver(false);
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
