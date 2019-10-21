document.addEventListener('DOMContentLoaded', () => {
  startGame();
  playerTypesWord();
})

const WORDS_SEEN = []
const WORDS_TYPED = []
let ALL_WORDS = []

function startGame() {
  const startBtn = document.getElementById('start-button')
  startBtn.addEventListener('click', () => {
    startBtn.classList.add('hidden');
    loadEntryForm();
    loadWordsFromApi();
  })
}

function loadWordsFromApi() {
  fetch('http://localhost:3000/word_lists')
  .then(resp => resp.json())
  .then(json => ALL_WORDS = json)
  .then(chooseRandomWords);
}

function chooseRandomWords() {  
  let wordsOnPage = document.getElementsByClassName('untyped');
  while (wordsOnPage.length < 3 ) {
    const location = Math.floor(Math.random() * ALL_WORDS.length);
    const randomWord = ALL_WORDS[location].word;
    if (!WORDS_SEEN.includes(randomWord)) {
      addWordToPage(randomWord);
      WORDS_SEEN.push(randomWord);
    }
  }
}

function addWordToPage(word) {
  const wordsToTypeUl = document.getElementById('words-to-type');
  const li = document.createElement('li');
  li.innerText = word;
  li.classList.add('untyped');
  wordsToTypeUl.append(li);
}

function loadEntryForm() {
  const typingFormDiv = document.getElementById('word-submission-div');
  typingFormDiv.classList.remove('hidden');
}

function playerTypesWord() {
  const typingForm = document.getElementById('word-submission-form');
  typingForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const typedSubmission = typingForm['player-input'].value;
    WORDS_TYPED.push(typedSubmission);
    if (WORDS_SEEN.includes(typedSubmission)) {
      removeWordFromPage(typedSubmission);
    } else {
      console.log('no match on page');
    }
    typingForm['word-entered'].value = '';
  })
}

function removeWordFromPage(submission) {
  let wordsOnPage = document.getElementsByClassName('untyped');
  for (const word in wordsOnPage) {
    if (submission === wordsOnPage[word].textContent)
    wordsOnPage[word].remove()
  }
}