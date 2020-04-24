export class InvalidMoveError extends Error {
  constructor(message) {
    super(message);
    this.name = 'InvalidMoveError';
  }
}

export class Rules {
  doTurns(state, turns) {}
  gameover(state) {}
}
