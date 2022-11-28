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

    
});