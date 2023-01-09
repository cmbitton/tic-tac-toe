//gameboard
const gameBoard = (function () {
    const boardValues = [[null, null, null], [null, null, null], [null, null, null]];
    const getCount = () => {
        let amountX = 0;
        let amountO = 0;
        for (const row of boardValues) {
            for (const tile of row) {
                if (tile === 'X') amountX++;
                else if (tile === 'O') amountO++;
            }
        }
        return { amountX, amountO };
    }

    const loadBoard = () => {
        const board = document.querySelectorAll('.board-tile');
        for (const tile of board) {
            const boardRow = +tile.getAttribute('data-row');
            const boardColumn = +tile.getAttribute('data-column');
            tile.textContent = boardValues[boardRow - 1][boardColumn - 1];
            if (boardValues[boardRow - 1][boardColumn - 1] !== null) {
                tile.classList.add('selected')
            };
        }
    }

    const updateBoardValues = (row, column, player) => {
        if ((boardValues[row - 1][column - 1] === null)) {
            (player === 1) ? boardValues[row - 1][column - 1] = 'X' : boardValues[row - 1][column - 1] = 'O';
        }
    }

    const resetBoard = () => {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                boardValues[i][j] = null;
            }
        }
    }

    const removeSelectedClass = () => {
        const board = document.querySelectorAll('.board-tile');
        for (const tile of board) {
            if (tile.classList.contains('selected')) tile.classList.remove('selected');
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

    return {
        loadBoard,
        updateBoardValues,
        getCount,
        resetBoard,
        removeSelectedClass,
        checkForWin
    }
})();

const player = (name) => {
    const playerNameInput = document.querySelector('.name-inputs');

    const toggleNameInputHidden = () => {
        if (playerNameInput.classList.contains('hidden')) {
            playerNameInput.classList.remove('hidden');
        }
        else if (!playerNameInput.classList.contains('hidden')) {
            playerNameInput.classList.add('hidden');
        }
    }
    return { name, toggleNameInputHidden };
}

const infoMod = (function () {
    const infoScreen = document.querySelector('.game-info');
    const replayButton = document.querySelector('.replay-button');

    const removeHiddenClass = () => {
        infoScreen.classList.remove('hidden');
    }

    const alertPlayerTurn = (number) => {
        (number === 1) ? infoScreen.textContent = `${game.player1.name} - Your Turn!` : infoScreen.textContent = `${game.player2.name} - Your Turn!`;
    }

    const alertPlayerWin = (number) => {
        replayButton.classList.remove('hidden');
        game.replayGame();
        if (number <= 2) {
            const winningPlayer = game[`player${number}`].name
            infoScreen.textContent = `${winningPlayer} is the Winner!`;
        }
        else {
            infoScreen.textContent = 'Tie!';
        }
    }

    return {
        alertPlayerTurn,
        removeHiddenClass,
        alertPlayerWin,
    }
})();

const game = (function () {
    let gameWon = false;
    const replayButton = document.querySelector('.replay-button');
    let player1name;
    let player2name;
    let player1;
    let player2;
    const playGame = () => {
        const playButton = document.querySelector('.play-button');
        const board = document.querySelector('.game-board');
        playButton.addEventListener('click', () => {
            game.player1name = document.querySelector('.player-1-name').value;
            game.player2name = document.querySelector('.player-2-name').value;
            game.player1 = game.createPlayer(game.player1name);
            game.player2 = game.createPlayer(game.player2name);
            playButton.classList.add('hidden');
            board.classList.remove('hidden');
            game.player1.toggleNameInputHidden();
            infoMod.removeHiddenClass();
            infoMod.alertPlayerTurn(1);
        })
    }

    const createPlayer = (name) => {
        const playerobj = Object.create(player(`${name}`));
        return playerobj;
    }

    const displayWin = () => {
        if (gameBoard.checkForWin('X')) {
            infoMod.alertPlayerWin(1);
            gameWon = true;
        }
        else if (gameBoard.checkForWin('O')) {
            infoMod.alertPlayerWin(2);
            gameWon = true;
        }
        else if (gameBoard.checkForWin('X') === false) {
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
                if (count.amountX > count.amountO && gameWon === false) {
                    gameBoard.updateBoardValues(markerRow, markerColumn, 2);
                    if (!e.target.classList.contains('selected')) infoMod.alertPlayerTurn(1);
                }
                else if (gameWon === false) {
                    gameBoard.updateBoardValues(markerRow, markerColumn, 1);
                    if (!e.target.classList.contains('selected')) infoMod.alertPlayerTurn(2);
                }

                gameBoard.loadBoard();
                displayWin();
            })
        }
    }

    const replayGame = () => {
        replayButton.addEventListener('click', () => {
            gameWon = false;
            replayButton.classList.add('hidden');
            gameBoard.resetBoard();
            gameBoard.loadBoard();
            gameBoard.removeSelectedClass();
            infoMod.alertPlayerTurn(1);
        })
    }

    return { placeMarker, playGame, replayGame, createPlayer, player1, player2, player1name, player2name }
})();


game.playGame();
game.placeMarker();