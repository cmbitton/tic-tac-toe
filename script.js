//gameboard
const gameBoard = (function () {
    const boardValues = [['X', null, 'O'], [null, null, null], [null, null, null]];
    const loadBoard = () => {
        const board = document.querySelectorAll('.board-tile');
        for (const tile of board){
            const boardRow = +tile.getAttribute('data-row');
            const boardColumn = +tile.getAttribute('data-column');
            tile.textContent = boardValues[boardRow - 1][boardColumn - 1]
        }
    }
    return {loadBoard}
})();

gameBoard.loadBoard();