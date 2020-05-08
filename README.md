## A League of Legends stats lookup website

This is a sample project containing some front-end and back-end codes.

[Visit official website here](https://sheltered-spire-49972.herokuapp.com/)

Visit https://developer.riotgames.com/ to learn more about APIs, DOCs, and policies.

---

#### Why am I creating this website?

There are many stats lookup websites but they are just not good enough.    

I am sure you have experienced one of these:
* When checking match history, one third of the screen is covered by ads. 
* When checking certain champion's recommended runes and items, a part of them is covered by ads. I choose the wrong rune and lose the game.
* The server is usually unstable and requires a long time to get result when too many people are using

Or you are one of them:
* Want to get to higher elos but don't know what you need to improve
* Can't win games because players are flaming each other
* Can't win lanes because you don't know what kind of player you are playing against, don't know if they are safe or aggressive player
* Can't win games because you don't know what your opponents are good at and what they are lack of

---

#### :clap::clap::clap: Introducing new stats look up website :clap::clap::clap:

##### Customized background images
* You will be able to choose your favorite splash art image as the website's background image.

##### Detailed analysis for each game
* a bunch of stats for each matchup(e.x. kp, kda, cs, dmg)
* fancy tags for highlights (e.x. double kill, penta kill)
* In depth analysis including how is your overall cs/gold, damage dealt/taken, turret taken, jungle monsters killed, etc (compared to both other players and your laning opponent)

##### Overall summary of a summoner
* Ranked elos, top three mastered champions
* Recent performance(recent 10 games): win/ loss strike, cs/dmg overall performance, whether player is heavy carrying team, etc
* ~~Use machine learning to predict future games~~ This feature is currently buggy and prediction is not accurate

##### In game
* All players with ranked elos and current playing champion's mastery
* Can click on each player to get his/her profile(summary+match history)

---

#### Future updates and features
I am trying to fix machine learning or use other algorithm to predict future games. I am also planning on creating a counter matchup page to help summoners cleverly choose their champions. I will use op.gg apis and my own algorithm to select top three counter champions.

For match analysis part, I will expand the analysis to each *time stamp* instead of the whole match. I am planning to show if a player is losing lane or winning lane. It will also show if player recovers back after losing lane or  wastes advantages after winning lanes.
If possible, I will use machine learning to analyze if player is easily camped and killed by jungler.

For in game spectator part, I will try to add a feature to detect any potential duos and trios


Vague ideas(possible in future updates):
* *determining a jungler's ganking routes.*

