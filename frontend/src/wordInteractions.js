document.addEventListener('DOMContentLoaded', () => {
  startGame();
  playerTypesWord();
})

const THREE_LETTER_WORDS = "https://api.datamuse.com/words/?sp=???&max=999"

function startGame() {
  const startBtn = document.getElementById('start-button')
  startBtn.addEventListener('click', () => {
    startBtn.classList.add('hidden');
    loadWordsFromApi();
    loadEntryForm();
  })
}

function loadWordsFromApi() {
  fetch(THREE_LETTER_WORDS)
  .then(resp => resp.json())
  .then(iterateOverWords)
}

function iterateOverWords(wordList) {
  wordList.forEach (word => {
    addWordToPage(word);
  })
}

function addWordToPage(word) {
  const wordsToTypeUl = document.getElementById('words-to-type');
  const li = document.createElement('li');
  li.innerText = word.word;
  li.id = word.word;
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
      matchOnPage.classList.add('hidden');
    } else {
      console.log('no match on page');
    }
    typingForm['word-entered'].value = '';
  })
}
