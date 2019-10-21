const THREE_LETTER_WORDS = 'https://api.datamuse.com/words/?sp=???&max=999';

document.addEventListener('DOMContentLoaded', () => {
  startGame();
  playerTypesWord();
});

function startGame () {
  const startBtn = document.getElementById('start-button');

  startBtn.addEventListener('click', () => {
    startBtn.classList.add('hidden');
    document.getElementById('leaderboard-button').classList.add('hidden');
    document.getElementById('leaderboard-window').classList.add('hidden');
    document.getElementById('game-won-header').classList.add('hidden');
    document.getElementById('game-lost-header').classList.add('hidden');

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
  fetch(THREE_LETTER_WORDS)
    .then(resp => resp.json())
    .then(chooseRandomWords);
}

function chooseRandomWords (wordList) {
  const wordsToTypeUl = document.getElementById('words-to-type');
  const wordsOnPage = wordsToTypeUl.getElementsByClassName('untyped');

  while (wordsOnPage.length < 4) {
    const location = Math.floor(Math.random() * 1000);
    addWordToPage(wordList[location]);
  }
}

function addWordToPage (word) {
  const wordsToTypeUl = document.getElementById('words-to-type');
  const li = document.createElement('li');

  li.innerText = word.word;
  li.id = word.word;
  li.classList.add('untyped');
  wordsToTypeUl.append(li);

  game.wordsSeen.push(word.word);
}

function loadEntryForm () {
  const typingFormDiv = document.getElementById('word-submission-div');
  typingFormDiv.classList.remove('hidden');
}

function playerTypesWord () {
  const typingForm = document.getElementById('word-submission-form');
  typingForm.addEventListener('submit', event => {
    event.preventDefault();

    const typedSubmission = typingForm['player-input'].value;
    const matchOnPage = document.getElementById(typedSubmission);

    if (matchOnPage) {
      matchOnPage.classList.remove('untyped');
      matchOnPage.classList.add('hidden');

      game.wordsTyped.push(typedSubmission);
    } else {
      game.typos++;
    }
    if (game.typos > 2) {
      gameOver(false);
    } else if (allWordsTyped()) {
      gameOver(true);
    }

    typingForm['word-entered'].value = '';
  });
}

function allWordsTyped () {
  return game.wordsTyped.length === game.wordsSeen.length;
}

function gameOver (win) {
  updateRun();

  if (win) {
    document.getElementById('game-won-header').classList.remove('hidden');
  } else {
    document.getElementById('game-lost-header').classList.remove('hidden');
  }
  document.getElementById('start-button').classList.remove('hidden');
  document.getElementById('leaderboard-button').classList.remove('hidden');

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
