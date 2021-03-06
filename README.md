
### WordSnake

[Live App](https://cmcd146.github.io/dist/index)

WordSnake is a word game using vanilla javascript.  I tried to blend two classics, Snake and Crossword into a fun and challenging game that test a persons vocabulary and spelling skills.  

Initially a one week project, I plan to continue adding features as time goes on.

## Features

* Allows user to enter words and string them together.
* Using an API call, the word is checked and a strike is added if the word does not exist.
* Player can change direction on completion of word.
* Score is updated as words are completed.
* When the player reaches three strikes, the game is over.

![wordsnake](https://user-images.githubusercontent.com/41452916/47969747-26933100-e031-11e8-9bf4-aee267867ef7.gif)

## Technologies

My goal was to use only vanilla Javascript.  Anything is possible with Javascript!  I faced some challenges but it was a great learning experience.

I used a opensource spellcheck API from [mashape](https://market.mashape.com/montanaflynn/spellcheck) tp allow me to check if the given word was valid as well.

## Future Features

Given the timeframe for this project, I could not implement all the features I would have liked.  Here is a list of the features I intend to add.

* A timer for each move
* Have the board pre-loaded with a few letters that the player can use for bonus points
* Restriction on usage of same word more than once
* Add animations and additional styling
* Allow for different languages
* Mobile version
