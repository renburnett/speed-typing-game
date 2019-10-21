const ACCOUNTS_URL = 'http://localhost:3000/accounts';
document.addEventListener('DOMContentLoaded', () => {
  fetchUsers();
});

function fetchUsers () {
  fetch(ACCOUNTS_URL)
    .then(res => res.json())
    .then(createAccounts);
}
function createAccounts (accounts) {
  for (const account of accounts) {
    displayAccount(createAccount(account));
  }
}
function displayAccount (accountDiv) {
  const leaderboardDiv = document.getElementById('leaderboard-window');
  leaderboardDiv.append(accountDiv);
}
function createAccount (account) {
  const accountDiv = document.createElement('div');
  const accountH3 = document.createElement('h3');
  const accountP = document.createElement('p');
  accountH2.textContent = account.username;
  accountP.textContent = account.email;
  accountDiv.append(accountH3, accountP);
  return accountDiv;
}
