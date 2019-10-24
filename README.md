#Welcome to the Typing Game! 

This simple but entertaining, and incredibly appropriately named game, gives you the opportunity to test your typing skills. Built in a single page application, be ready to have so much fun.

In order to play, you must first login with your name and email. Trust me, you want to, so that you can be added to the leaderboard!

When you start a game, words will start appearing on the page. Sometimes they might decide to show up in weird ways. Type them in to make them disappear. As time passes, the words will spawn more quickly. You get points for every word you enter, but be careful - **_typos will be the death of you_**. 

##DIY

If you're so inclined as to fork or clone our lovely game, there are a couple of things you should know. This game was coded using Ruby 2.6.1 with bundler v2. Before playing the game, make sure to run `rails db:migrate` and `rails db:seed` from the server file. Afterall, this game isn't very fun if you don't have a word bank you're pulling from. From there, make sure you have a rails server running before you try to open `index.html` for the real action.

If, however, that all sounds like _way too much work_, I feel you. Game plan (pun intended) is to deploy this to heroku shortly, so stay posted for a nice and easy link. 