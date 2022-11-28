window.addEventListener('DOMContentLoaded', () => {
    const tiles = Array.from(document.querySelectorAll('.tile')); // casillas del 3 en ralla
    const playerDisplay = document.querySelector('.display-player'); // display del turno del jugador, modificadlo
    const resetButton = document.querySelector('#reset'); // boton reset
    const announcer = document.querySelector('.announcer'); // texto donde mostraremos el resultado de la partida

    let board = ['', '', '', '', '', '', '', '', '']; // estructura de datos para el tablero
    let currentPlayer = 'X'; // Jugador actual
    let isGameActive = true; // Variable para controlar si el juego ha finalizado

    const PLAYERX_WON = 'PLAYERX_WON';
    const PLAYERO_WON = 'PLAYERO_WON';
    const TIE = 'TIE';


    /*
        Indices en el tablero
        [0] [1] [2]
        [3] [4] [5]
        [6] [7] [8]
    */

    // Possibles combinaciones para ganar
    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    //Para poder inicializar de nuevo el tablero al acabar la partida
    const resetBoard = () => {
        board = ['', '', '', '', '', '', '', '', ''];
        isGameActive = true;
        announcer.classList.add('hide');

        if (currentPlayer === 'O') {
            changePlayer();
        }

        tiles.forEach(tile => {
            tile.innerText = '';
            tile.classList.remove('playerX');
            tile.classList.remove('playerO');
        });
    }
    resetButton.addEventListener('click', resetBoard); //Accion que realiza el reset del tablero

    //Accion de cada jugador 
     const userAction = (tile, index) => {
        if(isValidAction(tile) && isGameActive) {
            tile.innerText = currentPlayer;
            tile.classList.add(`player${currentPlayer}`);
            updateBoard(index);
            handleResultValidation();
            changePlayer();
        }
    }

    tiles.forEach( (tile, index) => {
        tile.addEventListener('click', () => userAction(tile, index));
    }); //Marcador de cada ficha de cada jugador al hacer el click

    //cambiar cada jugador al realizar un click
    const changePlayer = () => {
        playerDisplay.classList.remove(`player${currentPlayer}`);
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        playerDisplay.innerText = currentPlayer;
        playerDisplay.classList.add(`player${currentPlayer}`);
    }


    //Para ir actualizando el tablero con la ficha de cada jugador correspondiente
    const updateBoard =  (index) => {
        board[index] = currentPlayer;
    }

    //Funcion para poder validar cada jugada para poder comprobar si ya existe la possible combinacion ganadora
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
            announce(currentPlayer === 'X' ? PLAYERX_WON : PLAYERO_WON);
            isGameActive = false;
            return;
        }

    if (!board.includes(''))
        announce(TIE);
    }

    const announce = (type) => {
        switch(type){
            case PLAYERO_WON:
                announcer.innerHTML = 'Player <span class="playerO">O</span> Won'; //Texto sobre jugador O ganador
                break;
            case PLAYERX_WON:
                announcer.innerHTML = 'Player <span class="playerX">X</span> Won'; //Texto sobre jugador X ganador
                break;
            case TIE:
                announcer.innerText = 'Tie'; //Texto de cuando existe empate en la partida
        }
        announcer.classList.remove('hide'); //Esto nos sirve para esconder el texto que hemos utilizado para anunciar lo que ha sucedido cuando reseteamos la board
    };

    const isValidAction = (tile) => {
        if (tile.innerText === 'X' || tile.innerText === 'O'){
            return false;
        }

        return true;
    };

    

});