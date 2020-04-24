import {InvalidMoveError, Rules} from '../rules.js';

export class NoughtsAndCrossesRules extends Rules {
  doTurns({players, board}, turns) {
    for (let [index, player] of players.entries()) {
      if (player.active) {
        let coords = turns[index]
                      .split(',', 2)
                      .map(n => Number(n));
        if (board[coords[0]][coords[1]] === ' ') {
          board[coords[0]][coords[1]] = player.name;
        } else {
          throw new InvalidMoveError('Did not play into an empty cell on your turn.');
        }
      }
      player.active = !player.active;
    }
  }
  
  gameover({players, board}) {
    const row = (n) => {return (board[n][0] == board[n][1] &&
                             board[n][0] == board[n][2] &&
                             board[n][0]);};
    const col = (n) => {return (board[0][n] == board[1][n] &&
                             board[0][n] == board[2][n] &&
                             board[0][n]);};
    const diag1 = () => {return (board[0][0] == board[1][1] &&
                              board[0][0] == board[2][2] &&
                              board[0][0]);};
    const diag2 = () => {return (board[0][2] == board[1][1] &&
                              board[0][2] == board[2][0] &&
                              board[0][2]);};
    const notBlank = cell => cell !== ' ' && cell;
    let i = 0;
    let triple = false;
    while (i < 3) {
      triple = triple || notBlank(row(i)) || notBlank(col(i));
      i++;
    }
    triple = triple || notBlank(diag1()) || notBlank(diag2());
    if (triple) {
      return players.map(player => ({...player, wins: this.over === player.name}));
    } else {
      return false;
    }
  }
}