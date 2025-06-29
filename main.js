// Fixed game logic with state management and draw detection
const gameOver = new Audio('./gameover.mp3');
const gameMusic = new Audio('./music.mp3');
const turnMusic = new Audio('./ting.mp3');
let turn = 'X';
let isGameover = false;
let gameActive = false;
let moveCount = 0;

// Function to change the turn
const changeTurn = () => {
    return turn === 'X' ? 'O' : 'X';
};

// Function to check for winner
const checkWinner = () => {
    let boxtext = document.getElementsByClassName('boxtext');
    const wins = [
        [0, 1, 2, 2, 3.8, 0],
        [3, 4, 5, 2, 11.8, 0],
        [6, 7, 8, 2, 19.8, 0],
        [0, 3, 6, -6, 12, 90],
        [1, 4, 7, 2, 12, 90],
        [2, 5, 8, 10, 12, 90],
        [0, 4, 8, 2, 11.7, 45],
        [2, 4, 6, 2, 12, 135]
    ];

    for (let e of wins) {
        if ((boxtext[e[0]].innerText === boxtext[e[1]].innerText) && 
            (boxtext[e[2]].innerText === boxtext[e[1]].innerText) && 
            (boxtext[e[0]].innerText !== '')) {
            
            document.getElementById('turnInfo').innerText = boxtext[e[0]].innerText + ' Won!';
            gameOver.play();
            isGameover = true;
            document.getElementById('winImage').style.width = '200px';
            document.querySelector('.line').style.width = '20vw';
            document.querySelector('.line').style.height = '3px';
            document.querySelector('.line').style.transform = `translate(${e[3]}vw, ${e[4]}vw) rotate(${e[5]}deg)`;
            return true;
        }
    }
    
    // Check for draw
    if (moveCount === 9 && !isGameover) {
        document.getElementById('turnInfo').innerText = 'Game Draw!';
        gameOver.play();
        isGameover = true;
        document.getElementById('winImage').style.width = '200px';
        return true;
    }
    
    return false;
};

// Initialize game
const initGame = () => {
    gameActive = true;
    isGameover = false;
    moveCount = 0;
    turn = 'X';
    
    gameMusic.currentTime = 0;
    gameMusic.play();
    
    document.getElementById('startGame').style.display = 'none';
    document.getElementById('turnInfo').style.display = 'inline';
    document.getElementById('turnInfo').innerText = `Turn for ${turn}`;
    document.querySelector('.line').style.width = '0';
    document.querySelector('.line').style.height = '0';
    document.getElementById('winImage').style.width = '0px';
    
    // Clear boxes
    let boxtext = document.getElementsByClassName('boxtext');
    Array.from(boxtext).forEach(element => {
        element.innerText = '';
    });
};

// Game Logic
document.getElementById('startGame').addEventListener('click', initGame);

// Reset functionality
document.getElementById('reset').addEventListener('click', () => {
    gameActive = false;
    isGameover = false;
    moveCount = 0;
    turn = 'X';
    
    gameMusic.pause();
    gameMusic.currentTime = 0;
    
    document.getElementById('startGame').style.display = 'inline';
    document.getElementById('turnInfo').style.display = 'none';
    document.querySelector('.line').style.width = '0';
    document.querySelector('.line').style.height = '0';
    document.getElementById('winImage').style.width = '0px';
    
    let boxtext = document.getElementsByClassName('boxtext');
    Array.from(boxtext).forEach(element => {
        element.innerText = '';
    });
});

let boxes = document.getElementsByClassName('box');
Array.from(boxes).forEach(element => {
    let boxtext = element.querySelector('.boxtext');
    element.addEventListener('click', () => {
        if (!gameActive || isGameover || boxtext.innerText !== '') return;
        
        boxtext.innerText = turn;
        turn = changeTurn();
        moveCount++;
        turnMusic.play();
        
        if (!checkWinner() && !isGameover) {
            document.getElementById('turnInfo').innerText = `Turn for ${turn}`;
        }
    });
});