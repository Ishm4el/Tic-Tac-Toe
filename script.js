//Board
// 0 1 2
// 3 4 5
// 6 7 8
const readline = require('readline');
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
    async function run() {
        let playerTurn = x; // general rule is that X goes first.
        do {
            await (() => {
                const rl = readline.createInterface(process.stdin, process.stdout);
                return new Promise(resolve => rl.question('0 | 1 | 2\n3 | 4 | 5\n6 | 7 | 8\n', place => {
                    rl.close();
                    board[place] = playerTurn;
                    playerTurn = playerTurn === x ? o : x;
                    console.log(printBoard());
                    resolve();
                }));
            })();
        } while (determineVictory())
    }

    // Prints the board - indicating which placements have been marked.
    function printBoard() {
        let printing = "=======\n|"
        for (let i = 0; i < board.length; i++) {
            printing += board[i] === undefined ? ".|" : board[i] === x ? "X|" : "O|";
            if (i === 2 || i === 5)
                printing += "\n|";
        }
        return printing += "\n=======\n";
    }
    return {run, determineVictory};
})();

console.log(game.run()); // run the game.
