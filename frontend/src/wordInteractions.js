document.addEventListener('DOMContentLoaded', () => {
  main();
})

const THREE_LETTER_WORDS = "https://api.datamuse.com/words/?sp=???&max=1000"

function main() {
  loadWordsFromApi()
  playerTypesWord()
}

function loadWordsFromApi() {
  // fetch(THREE_LETTER_WORDS)
  // .then(resp => resp.json())
  // .then(iterateOverWords)
}

function iterateOverWords(wordList) {
  wordList.forEach (word => {
    addWordToPage(word)
  })
}

function addWordToPage(word) {
  const wordsToTypeUl = document.getElementById('words-to-type')
  const li = document.createElement('li')
  li.innerText = word.word
  li.id = word.word
  wordsToTypeUl.append(li)
}

function playerTypesWord() {
  const typingForm = document.getElementById('word-submission-form')
  typingForm.addEventListener('submit', (event) => {
    event.preventDefault
    const typedSubmission = typingForm['player-input'].value
    const matchOnPage = document.getElementById(typedSubmission)
    if (matchOnPage) {
      matchOnPage.style.display = 'none'
    } else {
      console.log('no match on page')
    }
  })
}
