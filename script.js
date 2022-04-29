'use strict';
//Player - 1
const player0El = document.querySelector('.player--0');
const score0El = document.getElementById('score--0');
const currentScore0El = document.getElementById('current--0');

//Player - 2
const player1El = document.querySelector('.player--1');
const score1El = document.getElementById('score--1');
const currentScore1El = document.getElementById('current--1');

//Buttons
const newBtn = document.querySelector('.btn--new');
const rollDiceBtn = document.querySelector('.btn--roll');
const holdBtn = document.querySelector('.btn--hold');
//Dice
const diceEl = document.querySelector('.dice');

//Scopping
let score, activePlayer, currentScore, gameOver;
//Sub Problems
const initData = function () {
  score = [0, 0];
  activePlayer = 0;
  currentScore = 0;
  gameOver = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  currentScore0El.textContent = 0;
  currentScore1El.textContent = 0;
  diceEl.classList.add('hidden');

  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};
initData();

//Repeating Codes in function

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// Event on roll dice button

rollDiceBtn.addEventListener('click', function () {
  if (gameOver) {
    const dice = Math.trunc(Math.random() * 6) + 1;
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    currentScore += dice;
    if (dice !== 1) {
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

// Event On Hold

holdBtn.addEventListener('click', function () {
  if (gameOver) {
    score[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      score[activePlayer];
    if (score[activePlayer] >= 50) {
      gameOver = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      switchPlayer();
    }
  }
});

// Even On New Game
newBtn.addEventListener('click', initData);
