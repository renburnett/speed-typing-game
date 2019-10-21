let loggedInAccount

document.addEventListener('DOMContentLoaded', () => {
  console.log('Loaded')
})

document.getElementById('login-form').addEventListener('submit', (event) => {
  event.preventDefault()

  const form = document.getElementById('login-form')
  const username = form.elements.username.value
  const email = form.elements.email.value

  accountLogin(email, username)

  form.elements.username.value = ''
  form.elements.email.value = ''
})

function accountLogin (email, username) {
  fetch('http://localhost:3000/accounts')
    .then(resp => resp.json())
    .then(accounts => {
      loggedInAccount = accounts.find(account => account.email === email)
      if (!loggedInAccount) {
        createAccount(email, username)
          .then(resp => resp.json())
          .then(account => {
            loggedInAccount = account
            displayGame()
          })
      } else {
        displayGame()
      }
    })
}

function createAccount (email, username) {
  return fetch('http://localhost:3000/accounts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({
      email: email,
      username: username
    })
  })
}

function displayGame () {
  document.getElementById('login-form').classList.add('hidden')
  document.getElementById('game-window').classList.remove('hidden')
}
