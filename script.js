'use strict';

// Selecting elements
const currentRankElement = document.querySelector('#current-rank');
const messageElement = document.querySelector('#message');
const bankrollElement = document.querySelector('#bankroll');
const trialsElement = document.querySelector('#trials');
const betElement = document.querySelector('#bet');

const btnOpenModal = document.querySelector('.show-modal');
const btnCloseModal = document.querySelector('.close-modal');
const btnIncrease = document.querySelector('.btn-increase');
const btnDecrease = document.querySelector('.btn-decrease');

const overlay = document.querySelector('.overlay');
const modal = document.querySelector('.modal');

let isPlaying, bet, bankroll, trials, choice;

// Starting conditions
const init = function () {
    isPlaying = true;
    bet = 10;
    bankroll = 100;
    trials = 0;

    currentRankElement.textContent = 'newborn gambler';
    messageElement.textContent = '- Are you ready to make a fortune?';
    bankrollElement.textContent = bankroll;
    trialsElement.textContent = trials;
    betElement.textContent = bet;
};

// Functions
const manipulateModal = function () {
    modal.classList.toggle('hidden');
    overlay.classList.toggle('hidden');
};

const increaseBet = function () {
    if (isPlaying) {
        if (bet >= bankroll) {
            bet = bankroll;
        } else {
            bet += bankroll * 0.1;
        }
        messageElement.textContent =
            bet === bankroll ? '- ALL IN!' : `- Bet raised to ${bet}$`;
        betElement.textContent = bet;
    }
};

const decreaseBet = function () {
    if (isPlaying) {
        if (!(bet === bankroll * 0.1)) {
            bet -= bankroll * 0.1;
        }
        messageElement.textContent =
            bet === bankroll * 0.1
                ? '- MINIMAL BET!'
                : `- Bet reduced to ${bet}$`;
        betElement.textContent = bet;
    }
};

// Main
init();

btnOpenModal.addEventListener('click', manipulateModal);
btnCloseModal.addEventListener('click', manipulateModal);
overlay.addEventListener('click', manipulateModal);

btnIncrease.addEventListener('click', increaseBet);
btnDecrease.addEventListener('click', decreaseBet);
