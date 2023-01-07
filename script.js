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
        (player === 1) ? boardValues[row - 1][column - 1] = 'X' : boardValues[row - 1][column - 1] = 'O'
    }

    return { loadBoard,
             updateBoardValues,
             getCount}
})();

const player = (name, number) => {
    return { name, number };
}

const game = (function () {
    const placeMarker = () => {
        console.log('1')
        const board = document.querySelectorAll('.board-tile');
        for (const tile of board) {
            tile.addEventListener('click', (e) => {
                const markerRow = +e.target.getAttribute('data-row');
                const markerColumn = +e.target.getAttribute('data-column');
                const count = gameBoard.getCount();
                if(count.amountX > count.amountO){
                    gameBoard.updateBoardValues(markerRow, markerColumn, 2);
                }
                else{
                    gameBoard.updateBoardValues(markerRow, markerColumn, 1);
                }
                
                gameBoard.loadBoard();

            })
        }
    }


    return { placeMarker }
})();

gameBoard.loadBoard();
console.log(gameBoard.getCount())

game.placeMarker();