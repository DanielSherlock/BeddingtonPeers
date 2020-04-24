import {InvalidMoveError} from './rules.js';

// Uses a game object as defined in game.js
export async function localController(game) {
  while (!game.over) {
    let turns = [];
    for (let player of game.players) {
      turns.push(await game.inputTurn(player));
    }
    game.doTurns(turns);
  }
  game.declareResult();
}