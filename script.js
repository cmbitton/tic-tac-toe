//gameboard
const gameBoard = (function () {
    const boardValues = [[null, null, null], [null, null, null], [null, null, null]];
    const getCount = () => {
        let amountX = 0;
        let amountO = 0;
       for(const row of boardValues){
        for (const tile of row){
            if (tile === 'X') amountX++;
            else if(tile === 'O') amountO++;
        }
       }
       return {amountX, amountO};
    }

    const loadBoard = () => {
        const board = document.querySelectorAll('.board-tile');
        for (const tile of board) {
            const boardRow = +tile.getAttribute('data-row');
            const boardColumn = +tile.getAttribute('data-column');
            tile.textContent = boardValues[boardRow - 1][boardColumn - 1];
            if(boardValues[boardRow - 1][boardColumn - 1] !== null) {
                tile.classList.add('selected')
            };
        }
    }

    const updateBoardValues = (row, column, player) => {
        if ((boardValues[row - 1][column - 1] === null)){
        (player === 1) ? boardValues[row - 1][column - 1] = 'X' : boardValues[row - 1][column - 1] = 'O';
        }
    }

    const checkForWin = (letter) => {
        const gameCount = gameBoard.getCount();
        if (//win by row
            (boardValues[0][0] === letter && boardValues[0][1] === letter && boardValues[0][2] === letter) ||
            (boardValues[1][0] === letter && boardValues[1][1] === letter && boardValues[1][2] === letter) ||
            (boardValues[2][0] === letter && boardValues[2][1] === letter && boardValues[2][2] === letter) ||
            //win by column
            (boardValues[0][0] === letter && boardValues[1][0] === letter && boardValues[2][0] === letter) ||
            (boardValues[0][1] === letter && boardValues[1][1] === letter && boardValues[2][1] === letter) ||
            (boardValues[0][2] === letter && boardValues[1][2] === letter && boardValues[2][2] === letter) ||
            //win diagonally
            (boardValues[0][0] === letter && boardValues[1][1] === letter && boardValues[2][2] === letter) ||
            (boardValues[2][0] === letter && boardValues[1][1] === letter && boardValues[0][2] === letter)
        ) {
            return true;
        }
        else if (gameCount.amountO + gameCount.amountX === 9) return false;

    }

    return { loadBoard,
             updateBoardValues,
             getCount,
            checkForWin }
})();

const player = (name, number) => {
    return { name, number };
}

const infoMod = (function() {
    const infoScreen = document.querySelector('.game-info');
    
    const removeHiddenClass = () => {
        infoScreen.classList.remove('hidden');
    }
    
    const alertPlayerTurn = (number) => {
        infoScreen.textContent = `Player ${number} - Your Turn!`;
    }

    const alertPlayerWin = (number) => {
        if (number <= 2){
        infoScreen.textContent = `Player ${number} is the Winner!`;}
        else {
            infoScreen.textContent = 'Tie!';
        }
    }
    return { alertPlayerTurn, removeHiddenClass, alertPlayerWin }
})();

const game = (function () {
    let gameWon = false;
    const playGame = () => {
        const playButton = document.querySelector('.play-button');
        const board = document.querySelector('.game-board');
        playButton.addEventListener('click', () => {
            playButton.classList.add('hidden');
            board.classList.remove('hidden');
            infoMod.removeHiddenClass();
        })
    }

    const displayWin = () => {
        if(gameBoard.checkForWin('X')) {
            infoMod.alertPlayerWin(1);
            gameWon = true;
        }
        else if(gameBoard.checkForWin('O')) {
            infoMod.alertPlayerWin(2);
            gameWon = true;
        }
        else if (gameBoard.checkForWin('X') === false){
            infoMod.alertPlayerWin(3);
        }
    }

    const placeMarker = () => {
        const boardTiles = document.querySelectorAll('.board-tile');
        for (const tile of boardTiles) {
            tile.addEventListener('click', (e) => {
                const markerRow = +e.target.getAttribute('data-row');
                const markerColumn = +e.target.getAttribute('data-column');
                const count = gameBoard.getCount();
                if(count.amountX > count.amountO && gameWon === false){
                    gameBoard.updateBoardValues(markerRow, markerColumn, 2);
                    infoMod.alertPlayerTurn(1);
                }
                else if (gameWon === false){
                    gameBoard.updateBoardValues(markerRow, markerColumn, 1);
                    infoMod.alertPlayerTurn(2);
                }
                
                gameBoard.loadBoard();
                displayWin();
            })
        }
    }


    return { placeMarker, playGame }
})();


game.playGame();
game.placeMarker();