class Leaderboard {
  
  constructor () {
    this.leaderboardDiv = document.getElementById('users-container');
    this.leaderboardWindow = document.getElementById('leaderboard-window');

    this.displayAccount = this.displayAccount.bind(this);
    this.displayAccounts = this.displayAccounts.bind(this);
    this.displayAccountBestRun = this.displayAccountBestRun.bind(this);
    this.createAccountDiv = this.createAccountDiv.bind(this);
    this.getBestRun = this.getBestRun.bind(this);
    this.createBestRunElements = this.createBestRunElements.bind(this);
    this.fetchUsers = this.fetchUsers.bind(this);
    this.deleteRuns = this.deleteRuns.bind(this);
    this.handleLeaderboardToggle = this.handleLeaderboardToggle.bind(this);
  }

  fetchUsers () {
    fetch('http://localhost:3000/accounts')
      .then(res => res.json())
      .then(json => this.displayAccounts(json));
  }

  deleteRuns (runId) {
    const config = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    };

    return fetch(`http://localhost:3000/runs/${runId}`, config);
      // .then();
      // //TODO RE-Render HERE????
  }

  displayAccounts (accounts) {
    for (const account of accounts) {
      this.displayAccount(this.createAccountDiv(account));
      this.displayAccountBestRun(this.createBestRunElements(account));
    }
  }

  displayAccount (accountDiv) {
    this.leaderboardDiv.append(accountDiv);
  }

  displayAccountBestRun (bestRunElements) {
    for (const ele of bestRunElements) {
      this.leaderboardDiv.append(ele);
    }
  }

  createAccountDiv (account) {
    const accountDiv = document.createElement('div');
    const accountH3 = document.createElement('h3');
    accountH3.textContent = account.username;
    accountDiv.append(accountH3);

    return accountDiv;
  }

  getBestRun (runs) {
    let bestRun = runs[0];

    if (bestRun === undefined) {
      bestRun = {
        score: 0,
        words_typed: [],
        words_seen: [],
        id: undefined
      };
    } else {
      for (const run of runs) {
        if (run.score > bestRun.score) {
          bestRun = run;
        }
      }
    }
    return bestRun;
  }

  createBestRunElements (account) {
    const runScoreP = document.createElement('p');
    const runWordsTyped = document.createElement('p');
    const runWordsSeen = document.createElement('p');
    const runDeleteDutton = document.createElement('button');
    const runHr = document.createElement('hr');

    const bestRun = this.getBestRun(account.runs);

    runDeleteDutton.addEventListener('click', (event) => {
      if (bestRun.id !== undefined){
        this.deleteRuns(bestRun.id)
        .then(console.log(event.target.parentElement));
      } else {
        console.log('Cannot delete null run.');
      }

      //TODO: target event parent and re-Render
    });

    runScoreP.textContent = bestRun.score;
    runWordsTyped.textContent = bestRun.words_typed;
    runWordsSeen.textContent = bestRun.words_seen;
    runDeleteDutton.textContent = 'Delete';

    return [runScoreP, runWordsTyped, runWordsSeen, runDeleteDutton, runHr];
  }

  handleLeaderboardToggle () {
    const leaderboardToggle = document.getElementById('leaderboard-toggle');
    leaderboardToggle.addEventListener('click', (event) => {
      this.leaderboardWindow.classList.toggle('hidden');
      leaderboardToggle.parentElement.classList.toggle('active');
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const leaderboard = new Leaderboard();

  leaderboard.fetchUsers();
  leaderboard.handleLeaderboardToggle();
});
