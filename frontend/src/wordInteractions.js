document.addEventListener('DOMContentLoaded', () => {
  startGame();
  playerTypesWord();
})

function startGame() {
  const startBtn = document.getElementById('start-button')
  startBtn.addEventListener('click', () => {
    startBtn.classList.add('hidden');
    loadWordsFromApi();
    loadEntryForm();
  })
}

function loadWordsFromApi() {
  fetch('http://localhost:3000/word_lists')
  .then(resp => resp.json())
  .then(chooseRandomWords)
}

function chooseRandomWords(wordList) {
  let wordsOnPage = document.getElementsByClassName('untyped');
  while (wordsOnPage.length < 4 ) {
    const location = Math.floor(Math.random() * wordList.length);
    if (!wordIsOnPage(wordList[location].word, wordsOnPage)) {
      addWordToPage(wordList[location]);
    }
  }
}

function wordIsOnPage(word, wordsOnPage) {
  console.log("words on page:", wordsOnPage)
  // TODO: check if the word is currently on the page
}

function addWordToPage(word) {
  const wordsToTypeUl = document.getElementById('words-to-type');
  const li = document.createElement('li');
  li.innerText = word.word;
  li.id = word.word;
  li.classList.add('untyped')
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
    let typedSubmission = typingForm['player-input'].value;
    const matchOnPage = document.getElementById(typedSubmission);
    if (matchOnPage) {
      matchOnPage.classList.remove('untyped')
      matchOnPage.classList.add('hidden');
    } else {
      console.log('no match on page');
    }
    typingForm['word-entered'].value = '';
  })
}
