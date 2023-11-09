const game = (function () {
    const players = { player1 : "Player 1", player2 : "Player 2"};

    function boot(player1, player2) {
        if (player1 !== '')
            players.player1 = player1;
        if (player2 !== '')
            players.player2 = player2;
        
        doc.sidebarPlayer.innerHTML = players.player1;
        run();
    }

    const x = 1;
    const o = 0;
    const board = new Array(9);

    // Determine whether X or O has won; if so, end; else, continue.
    function determineVictory() {
        return checkForThree(x) ? true : checkForThree(o) ? true : false;
    }

    // The validator for checking if a player has won.
    function checkForThree(marker) {
        if (board[0] === marker && board[1] === marker && board[2] === marker || // horizontal top
            board[3] === marker && board[4] === marker && board[5] === marker || // horizontal mid
            board[6] === marker && board[7] === marker && board[8] === marker || // horizontal bot
            board[0] === marker && board[3] === marker && board[6] === marker || // vertical left
            board[1] === marker && board[4] === marker && board[7] === marker || // vertical mid
            board[2] === marker && board[5] === marker && board[8] === marker || // vertical rigth
            board[0] === marker && board[4] === marker && board[8] === marker || // diagnal left top to right bot
            board[6] === marker && board[4] === marker && board[2] === marker)   // diagnal left bot to right top 
            return true;
        return false;
    }

    // The main game
    function run() {
        let playerTurn = x; // general rule is that X goes first.
        doc.playerMarker.innerHTML = 'X';
        function boardReaction(element) {
            element.target.removeEventListener('click', boardReaction)
            if (playerTurn === x) {
                element.target.innerHTML = 'X';
                board[parseInt(element.target.dataset.position)] = playerTurn;
                playerTurn = o;
                doc.playerMarker.innerHTML = "O";
                doc.sidebarPlayer.innerHTML = players.player2;
            }
            else {
                element.target.innerHTML = 'O';
                board[parseInt(element.target.dataset.position)] = playerTurn;
                playerTurn = x;
                doc.playerMarker.innerHTML = "X";
                doc.sidebarPlayer.innerHTML = players.player1;
            }
            if (determineVictory()) {
                doc.plots.forEach((element) => {
                    element.removeEventListener('click', boardReaction);
                    doc.playerMarker.innerHTML = playerTurn === x ? "O" : "X";
                    doc.playerMarker.classList.toggle("victor");
                });
            }
        }

        doc.plots.forEach((element) => {
            element.addEventListener('click', boardReaction);
        });
    }
    function resetGame() {
        doc.plots.forEach((element) => {
            element.innerHTML = '';
        });
        for (let i = 0; i < board.length; i++) { board[i] = undefined; }
        doc.playerMarker.classList.toggle("victor");
        run();
    }
    return {boot, resetGame};
})();

const doc = (function () {
    const plots = document.querySelectorAll("#game > div");
    const playerMarker = document.querySelector(".currentMarkerSpan");
    const form = document.querySelector("form");
    const dialog = document.querySelector("#createPlayer");
    const submitButton = document.querySelector("#startGame");
    const resetButton = document.querySelector("#resetButton");
    const sidebarPlayer = document.querySelector("#currentPlayer");
    return { plots, playerMarker, form, dialog, submitButton, resetButton, sidebarPlayer };
})();

doc.resetButton.addEventListener('click', () => {
    game.resetGame();
});
doc.submitButton.addEventListener('click', (event) => {
    event.preventDefault();
    game.boot(doc.form.elements["playerOne"].value, doc.form.elements["playerTwo"].value);
    doc.dialog.style.display = 'none';
});