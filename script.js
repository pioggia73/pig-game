'use strict';

// ##### selecting elements 
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0Element = document.querySelector('#score--0');
const score1Element = document.querySelector('#score--1');
const currentScore0 = document.getElementById('current--0');
const currentScore1 = document.getElementById('current--1')
const diceElement = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// ##### starting conditions 

let scores, currentScore, activePlayer, playing; 

const init = function () {
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;

    score0Element.textContent = 0;
    score1Element.textContent = 0;
    currentScore0.textContent = 0;
    currentScore1.textContent = 0;
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    player1El.classList.remove('player--active');
    player0El.classList.add('player--active');
    diceElement.classList.add('hidden');
};

init();

const switchPlayer = function () {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
};

// ROLLING DICE FUNCTIONALITY

btnRoll.addEventListener('click', function() {
    if(playing) {
            // genarating a random dice roll between 1 and 6
    const dice = Math.trunc(Math.random() * 6) + 1
            // desplaying the dice
    diceElement.classList.remove('hidden')
    diceElement.src = `dice-${dice}.png`

            // checking for rolling 1 - if true, switch the player
    if(dice!==1){
             //currentScore = currentScore + dice
        currentScore += dice;
        document.getElementById(`current--${activePlayer}`).textContent = currentScore;
       
    } else {
            // switch to the next player
        switchPlayer()
    }
} 
});

btnHold.addEventListener('click', function () {
    if (playing) {

        // 1. add current score to active players score
        scores[activePlayer] +=  currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
        
        //2. check if score is >= 100
        if (scores[activePlayer] >= 100) {
            // finish the game
            playing = false;
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner')
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
            diceElement.classList.add('hidden');
        } else {
            // switch to the next player
            switchPlayer()
        }
    }
    });

btnNew.addEventListener('click', init);


