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
            tile.textContent = boardValues[boardRow - 1][boardColumn - 1]
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

const game = (function () {
    let gameWon = false;
    const placeMarker = () => {
        const board = document.querySelectorAll('.board-tile');
        for (const tile of board) {
            tile.addEventListener('click', (e) => {
                const markerRow = +e.target.getAttribute('data-row');
                const markerColumn = +e.target.getAttribute('data-column');
                const count = gameBoard.getCount();
                if(count.amountX > count.amountO && gameWon === false){
                    gameBoard.updateBoardValues(markerRow, markerColumn, 2);
                }
                else if (gameWon === false){
                    gameBoard.updateBoardValues(markerRow, markerColumn, 1);
                }
                
                gameBoard.loadBoard();
                if(gameBoard.checkForWin('X') || gameBoard.checkForWin('O')) {
                    console.log('WIN!');
                    gameWon = true;
                }
                else if (gameBoard.checkForWin('X') === false){
                    console.log('tie')
                }

            })
        }
    }


    return { placeMarker }
})();

gameBoard.loadBoard();

game.placeMarker();