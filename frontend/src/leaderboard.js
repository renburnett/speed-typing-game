const ACCOUNTS_URL = 'http://localhost:3000/accounts';

document.getElementById('leaderboard-button').addEventListener('click', () => {
  const leaderboard = document.getElementById('leaderboard-window');
  while (leaderboard.firstChild) {
    leaderboard.removeChild(leaderboard.firstChild);
  }
  document.getElementById('leaderboard-window').classList.remove('hidden');
  fetchUsers();
});

function fetchUsers () {
  fetch(ACCOUNTS_URL)
    .then(res => res.json())
    .then(displayAccounts);
}
function displayAccounts (accounts) {
  for (const account of accounts) {
    displayAccount(createAccountDiv(account));
  }
}
function displayAccount (accountDiv) {
  const leaderboardDiv = document.getElementById('leaderboard-window');
  leaderboardDiv.append(accountDiv);
}
function createAccountDiv (account) {
  const accountDiv = document.createElement('div');
  const accountH3 = document.createElement('h3');
  const accountP = document.createElement('p');

  accountH3.textContent = account.username;
  accountP.textContent = account.email;
  accountDiv.append(accountH3, accountP);

  return accountDiv;
}
