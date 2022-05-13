'use strict';

// Selecting elements
const currentRankElement = document.querySelector('#current-rank');
const messageElement = document.querySelector('#message');
const bankrollElement = document.querySelector('#bankroll');
const trialsElement = document.querySelector('#trials');
const betElement = document.querySelector('#bet');
const coinImage = document.querySelector('#coin-image');

const btnOpenModal = document.querySelector('.show-modal');
const btnCloseModal = document.querySelector('.close-modal');
const btnIncrease = document.querySelector('.btn-increase');
const btnDecrease = document.querySelector('.btn-decrease');
const btnReverse = document.querySelector('.btn-reverse');
const btnObverse = document.querySelector('.btn-obverse');
const btnToss = document.querySelector('.btn-toss');
const btnAgain = document.querySelector('.btn-again');
const btnRestart = document.querySelector('.btn-restart');

const overlay = document.querySelector('.overlay');
const modal = document.querySelector('.modal');

let isPlaying, bet, bankroll, trials, choice;
let coinImgPaths = [
    'assets/reverse.png',
    'assets/obverse.png',
    'assets/unknown.png',
];

// Starting conditions
const init = function () {
    isPlaying = true;
    bankroll = 100;
    bet = bankroll * 0.1;
    trials = 0;

    overlay.classList.add('hidden');
    btnRestart.classList.add('hidden');
    currentRankElement.textContent = 'newborn gambler';
    messageElement.textContent = '- Are you ready to make a fortune?';
    bankrollElement.textContent = bankroll;
    trialsElement.textContent = trials;
    betElement.textContent = bet;
};

// Functions
const updateRank = function () {
    if (bankroll >= 500 && bankroll < 1000) {
        currentRankElement.textContent = 'gambler';
    } else if (bankroll >= 1000 && bankroll < 5000) {
        currentRankElement.textContent = 'lucky guy';
    } else if (bankroll >= 5000 && bankroll < 10000) {
        currentRankElement.textContent = 'old stager';
    } else if (bankroll >= 10000 && bankroll < 25000) {
        currentRankElement.textContent = 'midas';
    } else if (bankroll >= 25000 && bankroll < 50000) {
        currentRankElement.textContent = 'casino champion';
    } else if (bankroll >= 50000 && bankroll < 100000) {
        currentRankElement.textContent = 'wolf of vegas';
    } else if (bankroll >= 100000) {
        currentRankElement.textContent = 'future millionaire';
    }
};

const switchModal = function () {
    modal.classList.toggle('hidden');
    overlay.classList.toggle('hidden');
};

const increaseBet = function () {
    if (isPlaying) {
        if (bet > bankroll * 0.9) {
            bet = bankroll;
        } else {
            bet += bankroll * 0.1;
        }
        messageElement.textContent =
            bet === bankroll
                ? '- ALL IN!'
                : `- Bet raised to ${Math.round(bet * 10) / 10}$`;
        betElement.textContent = Math.round(bet * 10) / 10;
    }
};

const decreaseBet = function () {
    if (isPlaying) {
        if (bet < bankroll * 0.2) {
            bet = bankroll * 0.1;
        } else {
            bet -= bankroll * 0.1;
        }
        messageElement.textContent =
            bet <= bankroll * 0.1
                ? '- MINIMAL BET!'
                : `- Bet reduced to ${Math.round(bet * 10) / 10}$`;
        betElement.textContent = Math.round(bet * 10) / 10;
    }
};

const betOnReverse = function () {
    if (isPlaying) {
        choice = 1;
        messageElement.textContent = '- You bet on the reverse.';
    }
};

const betOnObverse = function () {
    if (isPlaying) {
        choice = 2;
        messageElement.textContent = '- You bet on the obverse.';
    }
};

const tossCoin = function () {
    if (isPlaying) {
        if (!choice) {
            messageElement.textContent =
                '- Choose between reverse or obverse first!';
        } else {
            isPlaying = false;
            const random = Math.trunc(Math.random() * 2);
            coinImage.src = `${coinImgPaths[random]}`;
            console.log(choice, random);
            if (choice === random + 1) {
                messageElement.textContent = '- You win!';
                bankroll = Math.round(bankroll + bet);
            } else {
                bankroll = Math.round(bankroll - bet);
                if (bankroll === 0) {
                    messageElement.textContent =
                        '- You lost all of your money, better go back home.';
                    btnAgain.classList.remove('hidden');
                    btnRestart.classList.remove('hidden');
                    overlay.classList.toggle('hidden');
                    messageElement.style.zIndex = '10';
                } else {
                    messageElement.textContent = '- You fail...';
                }
            }
            bankrollElement.textContent = bankroll;
            btnAgain.classList.toggle('hidden');
            updateRank();
        }
    }
};

const playAgain = function () {
    isPlaying = true;
    trials += 1;
    choice = 0;
    bet = bankroll * 0.1;
    trialsElement.textContent = trials;
    messageElement.textContent = "- You don't know when to stop, huh?";
    betElement.textContent = Math.round(bet * 10) / 10;
    coinImage.src = `${coinImgPaths[2]}`;
    btnAgain.classList.add('hidden');
};

// Main
init();

btnOpenModal.addEventListener('click', switchModal);
btnCloseModal.addEventListener('click', switchModal);
overlay.addEventListener('click', () => {
    if (btnRestart.classList.contains('hidden')) {
        switchModal();
    }
});

btnIncrease.addEventListener('click', increaseBet);
btnDecrease.addEventListener('click', decreaseBet);
btnReverse.addEventListener('click', betOnReverse);
btnObverse.addEventListener('click', betOnObverse);
btnToss.addEventListener('click', tossCoin);
btnAgain.addEventListener('click', playAgain);
btnRestart.addEventListener('click', init);
