//Board
// 0 1 2
// 3 4 5
// 6 7 8
const game = (function () {
    
    const x = 1;
    const o = 0;
    const board = new Array(9);

    // Determine whether X or O has won; if so, end;
    // else, continue.
    function determineVictory() {
        if (checkForThree(x)) {
            return !true;
        }
        else if (checkForThree(o)) {
            return !true;
        }
        return !false;
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
            board[6] === marker && board[4] === marker && board[2] === marker) { // diagnal left bot to right top
                return true;
            }
        return false;
    }

    // The main game
    function run() {
        let playerTurn = x; // general rule is that X goes first.
        const plots = document.querySelectorAll("#game > div");
        plots.forEach((element) => {
            element.addEventListener('click', () => {
                element.innerHTML = playerTurn === x ? 'X' : 'O';
                board[element.dataset] = playerTurn;
                playerTurn = playerTurn === x ? o : x;
                console.log(playerTurn);
            });
        });
    }
    return {run, determineVictory};
})();

const displayMarker = document.querySelector("#currentMarker");
console.log(game.run()); // run the game.
