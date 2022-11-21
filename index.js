window.addEventListener('DOMContentLoaded', () => {
    const tiles = Array.from(document.querySelectorAll('.tile')); // casillas del 3 en ralla
    const playerDisplay = document.querySelector('.display-player'); // display del turno del jugador, modificadlo para mostrar el turno del jugador
    const resetButton = document.querySelector('#reset'); // boton reset
    const announcer = document.querySelector('.announcer'); // texto donde mostraremos el resultado de la partida

    let board = ['', '', '', '', '', '', '', '', '']; // Estructura de datos para el tablero
    let currentPlayer = 'X'; // Jugador actual
    let isGameActive = true; // Variable para cotrolar si el juego ha finalizado

    /*
        Indices en el tablero
        [0] [1] [2]
        [3] [4] [5]
        [6] [7] [8]
    */
    const WINNING_COMBINATIONS = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]    

    const X_WON = 'Ha ganado el jugador X!';
    const O_WON = 'Ha ganado el jugador X!';
    const TIE = 'Hay un empate!';

    const announce = (type) => {
        switch (type){
            case X_WON:
                announcer.innerHTML = `Player <span class="X">X</span> Won`;
            break;
            case O_WON:
                announcer.innerHTML = `Player <span class="O">O</span> Won`;
            break;
            case TIE:
                announcer.innerHTML = 'Empate!'
            break;
        }
        announcer.classList.remove('hide');
    }
    function handleResultValidation() {
        let roundWon = false;
        for (let i = 0; i <= 7; i++) {
            const winCondition = winningConditions[i];
            const a = board[winCondition[0]];
            const b = board[winCondition[1]];
            const c = board[winCondition[2]];
            if (a === '' || b === '' || c === '') {
                continue;
            }
            if (a === b && b === c) {
                roundWon = true;
                break;
            }
        }

        if (roundWon) {
            announce(currentPlayer === 'X' ? X_WON : O_WON);
            isGameActive = false;
            return;
        }

        if (!board.includes(''))
        announce(TIE);
    }
    const isValidAction = (tile) => {
        if (tile.innerText === 'X' || tile.innerText === 'O'){
            return false;
        }

        return true;
    }

    const updateBoard = (index => {
        board[index] = currentPlayer;
    })

    const changePlayer = () => {
        playerDisplay.classList.add(`player${currentPlayer}`);
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        playerDisplay.innerText = currentPlayer;
        playerDisplay.classList.add(`player${currentPlayer}`);
    }

    const userAction = (tile, index) => {
        if(isValidAction(tile) && isGameActive) {
            tile.innerText = currentPlayer;
            tile.classlist.add(`player${currentPlayer}`);
            updateBoard(index);
            handleResultValidation();
            changePlayer();
        }
    }

     
    const resetBoard = () => {
        board = ['', '', '', '', '', '', '', '', '',];
        isGameActive = true;
        announcer.classList.add('hide');

        if (currentPlayer === 'O') {
            changePlayer();
        }

        tiles.forEach(tile => {
            tile.innerText = '';
            tile.classList.add('X')
            tile.classList.add('O')
        });
    }

    tiles.forEach( (tile, index) => {
        tile.addEventListener('click', () => userAction(tile, index));
    });

    resetButton.addEventListener('click', resetBoard);


    


});