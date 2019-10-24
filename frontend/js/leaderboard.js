document.addEventListener('DOMContentLoaded', () => {
  leaderboard.fetchUsers();
  leaderboard.handleLeaderboardToggle();
});

class Leaderboard {
  constructor () {
    this.leaderboardTableBody = document.getElementById('leaderboard-tbody');
    this.leaderboardWindow = document.getElementById('leaderboard-window');

    this.orderUsersBestRuns = this.orderUsersBestRuns.bind(this);
    this.displayAccountsAndBestRuns = this.displayAccountsAndBestRuns.bind(this);
    this.displayAccountBestRun = this.displayAccountBestRun.bind(this);
    this.getUserBestRun = this.getUserBestRun.bind(this);
    this.createAccountAndBestRunElements = this.createAccountAndBestRunElements.bind(this);
    this.fetchUsers = this.fetchUsers.bind(this);
    this.deleteRun = this.deleteRun.bind(this);
    this.calcWpm = this.calcWpm.bind(this);
    this.handleLeaderboardToggle = this.handleLeaderboardToggle.bind(this);
  }

  fetchUsers () {
    fetch('http://localhost:3000/accounts')
      .then(res => res.json())
      .then(json => this.displayAccountsAndBestRuns(json));
  }

  deleteRun (runId) {
    const config = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    };

    fetch(`http://localhost:3000/runs/${runId}`, config)
      .then(() => {
        this.clearUserAccountsFromTable();
        this.fetchUsers();
      });
  }

  clearUserAccountsFromTable () {
    while (this.leaderboardTableBody.firstChild) {
      this.leaderboardTableBody.removeChild(this.leaderboardTableBody.firstChild);
    }
  }

  displayAccountsAndBestRuns (accounts) {
    const runElements = [];
    this.clearUserAccountsFromTable();

    for (const account of accounts) {
      runElements.push(this.createAccountAndBestRunElements(account));
    }
    this.orderUsersBestRuns(runElements);

    for (const run of runElements) {
      this.displayAccountBestRun(run.runElements);
    }
  }

  displayAccountBestRun (bestRun) {
    this.leaderboardTableBody.append(bestRun);
  }

  orderUsersBestRuns (arr) {
    arr.sort((a, b) => {
      if (a.score > b.score) { return -1; } else if (a.score < b.score) { return 1; } else { return 0; }
    });
  }

  getUserBestRun (runs) {
    let bestRun = runs[0];

    if (bestRun === undefined) {
      bestRun = {
        score: 0,
        words_typed: [],
        words_seen: [],
        id: undefined,
        account_id: undefined
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

  calcWpm (lengthTyped, bestRun) {
    // compare create and update times of the run
    // return Math.round(minutesInRun / lengthTyped);
    const startTime = new Date(bestRun.created_at);
    const endTime = new Date(bestRun.updated_at);
    const minutesInRun = ((endTime - startTime) / 60000); // how many mintutes in run
    return Math.round(lengthTyped / minutesInRun * 100) / 100;
  }

  createAccountAndBestRunElements (account) {
    const runContainer = document.createElement('tr');
    const userName = document.createElement('td');
    const runScore = document.createElement('td');
    const runWordsTyped = document.createElement('td');
    const runWordsSeen = document.createElement('td');
    const runWPM = document.createElement('td');
    const runDeleteButton = document.createElement('button');

    const bestRun = this.getUserBestRun(account.runs);

    runDeleteButton.addEventListener('click', () => {
      if (bestRun.id !== undefined) {
        this.deleteRun(bestRun.id);
      } else {
        console.log('Cannot delete null run.');
        // TODO: maybe change to modal popup?
      }
    });

    const lengthTyped = bestRun.words_typed.split(',').length;
    const lengthSeen = bestRun.words_seen.split(',').length;

    userName.textContent = account.username;
    runScore.textContent = bestRun.score;
    runWordsTyped.textContent = lengthTyped;
    runWordsSeen.textContent = lengthSeen;
    runWPM.textContent = this.calcWpm(lengthTyped, bestRun);
    runDeleteButton.textContent = 'Delete';
    runDeleteButton.classList.add('btn', 'btn-primary', 'link');

    runContainer.append(userName, runScore, runWordsTyped, runWordsSeen, runWPM);

    if (game.account && Number(game.account.id) === Number(account.id)) {
      runContainer.append(runDeleteButton);
    }

    return { runElements: runContainer, accountId: account.id, score: bestRun.score };
  }

  handleLeaderboardToggle () {
    const leaderboardToggle = document.getElementById('leaderboard-toggle');
    leaderboardToggle.addEventListener('click', () => {
      this.leaderboardWindow.classList.toggle('hidden');
      leaderboardToggle.parentElement.classList.toggle('active');
    });
  }
}

const leaderboard = new Leaderboard();
