class Game {
  constructor (account, run, wordsTyped = [], wordsSeen = [], score = 0, typos = 0) {
    this.account = account;
    this.run = run;
    this.wordsTyped = wordsTyped;
    this.wordsSeen = wordsSeen;
    this.score = score;
    this.typos = typos;
    this.turns = 0;
    this.difficulty = 14;
  }
}
