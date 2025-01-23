const starsContainer = document.querySelector('.stars');
const gridItems = document.querySelectorAll('.grid-item');
const messageContainer = document.querySelector('.message-container'); 

let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matches = 0;

for (let i = 0; i < 20; i++) {
    const star = document.createElement('div');
    star.classList.add('star');
    
    star.style.left = Math.random() * 100 + '%';
    
    star.style.animationDelay = Math.random() * 4 + 's';
    star.style.animationDuration = Math.random() * 3 + 2 + 's'; 
    
    starsContainer.appendChild(star);
}
gridItems.forEach(item => {
    item.addEventListener('click', () => {
        item.classList.toggle('flipped');
    });
});

function shuffleGrid() {
    const itemsArray = Array.from(gridItems);
    const imageSources = itemsArray.map(item => item.querySelector('img').src); 

    const shuffledImages = imageSources.sort(() => Math.random() - 0.5);

    itemsArray.forEach((item, index) => {
        item.querySelector('img').src = shuffledImages[index];
    });
}
function flipCard() {
    if (lockBoard || this === firstCard) return;

    this.classList.add('flipped');
    if (!firstCard) {
        firstCard = this; 
        return;
    }

    secondCard = this; 
    checkMatch(); 
}

function checkMatch() {
    const isMatch = firstCard.querySelector('img').src === secondCard.querySelector('img').src;

    if (isMatch) {
        disableCards(); 
        matches++;
        if (matches === gridItems.length / 2) {
            setTimeout(() => showWinMessage(), 300);
        }
    } else {
        unflipCards(); 
    }
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
}

function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        resetBoard();
    }, 1000);
}

function resetBoard() {
    [firstCard, secondCard, lockBoard] = [null, null, false];
}

function highlightWinningCards() {
    gridItems.forEach(item => {
        if (item.classList.contains('flipped')) {
            item.classList.add('win-card'); 
        }
    });
}

function fadeOutGrid() {
    gridItems.forEach(item => item.classList.add('fade-out')); 
}

function showWinMessage() {
    highlightWinningCards();
    fadeOutGrid();

    setTimeout(() => {
        messageContainer.style.display = 'block';
    }, 300); 
}

function restartGame() {
    messageContainer.style.display = 'none';

    gridItems.forEach(item => {
        item.classList.remove('win-card');
        item.classList.remove('fade-out');
    });

    shuffleGrid();

    matches = 0;
    gridItems.forEach(item => item.classList.remove('flipped'));

    initializeGame();
}

const restartButton = document.getElementById('restart-btn');
restartButton.addEventListener('click', restartGame);

function initializeGame() {
    shuffleGrid();
    gridItems.forEach(item => item.addEventListener('click', flipCard));
}
initializeGame();
