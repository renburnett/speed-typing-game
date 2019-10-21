document.addEventListener('DOMContentLoaded', () => {
  startGame();
  playerTypesWord();
});

const THREE_LETTER_WORDS = 'https://api.datamuse.com/words/?sp=???&max=999';
let currentRun;

function startGame () {
  const startBtn = document.getElementById('start-button');

  startBtn.addEventListener('click', () => {
    startBtn.classList.add('hidden');
    document.getElementById('leaderboard-button').classList.add('hidden');
    document.getElementById('leaderboard-window').classList.add('hidden');

    createNewRun()
      .then(resp => resp.json())
      .then(run => {
        currentRun = run;
        console.log(currentRun);
      });

    loadWordsFromApi();
    loadEntryForm();
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
      account_id: loggedInAccount.id,
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
    } else {
      console.log('no match on page');
    }
    typingForm['word-entered'].value = '';
  });
}
