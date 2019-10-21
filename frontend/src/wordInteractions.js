document.addEventListener('DOMContentLoaded', () => {
  startGame();
  playerTypesWord();
});

let ALL_WORDS = [];

function startGame () {
  const startBtn = document.getElementById('start-button');
  startBtn.addEventListener('click', () => {
    startBtn.classList.add('hidden');
    document.getElementById('leaderboard-button').classList.add('hidden');
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
    .then(chooseRandomWords);
}

function chooseRandomWords () {
  const wordsOnPage = document.getElementsByClassName('untyped');
  while (wordsOnPage.length < 3) {
    const location = Math.floor(Math.random() * ALL_WORDS.length);
    const randomWord = ALL_WORDS[location].word;
    if (!game.wordsSeen.includes(randomWord)) {
      addWordToPage(randomWord);
      game.wordsSeen.push(randomWord);
    }
  }
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

function allWordsTyped () {
  return game.wordsTyped.length === game.wordsSeen.length;
}

function gameOver () {
  updateRun();

  document.getElementById('game-over-header').classList.remove('hidden');
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
