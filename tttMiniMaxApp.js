
// Wrap every letter in a span animation header TIC TAC TOE
var textWrapper = document.querySelector('.ml10 .letters');
textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

anime.timeline({loop: true})
  .add({
    targets: '.ml10 .letter',
    rotateY: [-90, 0],
    duration: 1300,
    delay: (el, i) => 45 * i
  }).add({
    targets: '.ml10',
    opacity: 0,
    duration: 1000,
    easing: "easeOutExpo",
    delay: 1000
  });


//Elements on Page ********************
const humanMark = 'X'; 
const aiMark = 'O'; 
const coinFlipDisplayBox = document.getElementById('coinFlipWinnerDisplay');
const headsOrTailsButtons = Array.from(document.getElementsByClassName('headsTailsButton'));
const winningMessageScreen = document.getElementById('winningMessage'); 
const winDisplayMessage = document.getElementById('winDisplayMessage');
const restartButton = document.getElementById('restartButton'); 
const cells = document.querySelectorAll('[data-cell]');
const cellsArray = Array.from(cells);
let board = Array(9).fill("");      // initialize an empty board with 9 spaces
const winningCombos = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];



function checkWin(board) {                        
    for (let combo of winningCombos) {
        if (board[combo[0]] === humanMark && board[combo[0]] === board[combo[1]] && board[combo[1]] === board[combo[2]]) {
            winningMessageScreen.style.display = 'flex';
            winDisplayMessage.innerHTML = humanMark + ' WINS!';
            return humanMark;
        } else if (board[combo[0]] === aiMark && board[combo[0]] === board[combo[1]] && board[combo[1]] === board[combo[2]]) {
            winningMessageScreen.style.display = 'flex';
            winDisplayMessage.innerHTML = aiMark + ' WINS!';
            return aiMark;
        }
    }
    
    if (board.every(cell => cell !== "")) {
        winningMessageScreen.style.display = 'flex';
        winDisplayMessage.innerHTML = 'TIE!';
        return true;
    }
    
    else {
        return false;
    }
};

function inTheoryCheckWin(board) {                        
    for (let combo of winningCombos) {
        if (board[combo[0]] === humanMark && board[combo[0]] === board[combo[1]] && board[combo[1]] === board[combo[2]]) {
            return humanMark;
        } else if (board[combo[0]] === aiMark && board[combo[0]] === board[combo[1]] && board[combo[1]] === board[combo[2]]) {
            return aiMark;
        }
    }
    
    if (board.every(cell => cell !== "")) {
        return true;
    }
    
    else {
        return false;
    }
};



function startGameCoinToss() {
    randomNumber = Math.floor(Math.random() * 2 );
    if (randomNumber < 1 ) {
        humanTurn();
        coinFlipDisplayBox.innerHTML = 'You win, you go first.';
        coinFlipDisplayBox.style.opacity = '1';
        return true;
    } else {
        aiTurn();
        coinFlipDisplayBox.innerHTML = 'You lose, I go first.';
        coinFlipDisplayBox.style.opacity = '1';
        return false;
    }
};


function cellClickHandler(e) {
    if (!e.target.innerHTML) {
        e.target.innerHTML = humanMark;
        board[e.target.dataset.cell] = humanMark;
        if (!checkWin(board)) {
            aiTurn(); 
        }; 
    }
};

function miniMax(board, depth, isMaximizing) { //miniMax Algo
    let result = inTheoryCheckWin(board); 
    if (result === false) {
      if (isMaximizing) {
        let bestScore = -Infinity;
        let bestMove = null;
        for (let i = 0; i < board.length; i++) {
          if (board[i] === "") {
            board[i] = aiMark;
            let score = miniMax(board, depth + 1, false);
            board[i] = "";
            if (score > bestScore) {
              bestScore = score;
              bestMove = i;
            }
          }
        }
        return depth === 0 ? bestMove : bestScore;
      } else {
        let bestScore = Infinity;
        let bestMove = null;
        for (let i = 0; i < board.length; i++) {
          if (board[i] === "") {
            board[i] = humanMark;
            let score = miniMax(board, depth + 1, true);
            board[i] = "";
            if (score < bestScore) {
              bestScore = score;
              bestMove = i;
            }
          }
        }
        return depth === 0 ? bestMove : bestScore;
      }
    } else if (result === aiMark) {
      return 10 - depth;
    } else if (result === humanMark) {
      return depth - 10;
    } else {
      return 0;
    }
};

cells.forEach(cell => cell.addEventListener('mouseover', (e) => {       //hover over cell effects
    if (e.target.innerHTML) {
        e.target.style.cursor = 'not-allowed'; 
    } else {
        e.target.style.backgroundColor = '#a38ae2'; 
        e.target.style.cursor = 'pointer';
        
    }
}));

cells.forEach(cell => cell.addEventListener('mouseout', (e) => {         //reset cell effects
    e.target.style.backgroundColor = '#24134d';
}));


function aiTurn() {
    //cells.forEach(cell => cell.removeEventListener("click", cellClickHandler ));
    // Find the best move using the MiniMax algorithm
    let bestMove = miniMax(board, 0, true);
    cells[bestMove].innerHTML = aiMark;
    board[bestMove] = aiMark;
    if (!checkWin(board)) {
        humanTurn(); 
    }
};
  

  
  function humanTurn() {
    cells.forEach(cell => cell.addEventListener('click', cellClickHandler));
};

restartButton.addEventListener('click', () => {
    winningMessageScreen.style.display = 'none';
    cells.forEach(cell => cell.innerHTML = "");
    board = Array(9).fill("");
    coinFlipDisplayBox.innerHTML = '';
    coinFlipDisplayBox.style.opacity = '0';
    cells.forEach(cell => cell.removeEventListener('click', cellClickHandler));
});



headsOrTailsButtons.forEach(button => button.addEventListener('click', () => {
    if (coinFlipDisplayBox.innerHTML === '') {
        startGameCoinToss();      
    }
})); 






  
  


















































