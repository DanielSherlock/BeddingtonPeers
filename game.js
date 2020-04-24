class Game {
  doTurns(turns) {}
  /* ? */ async inputTurn(player /* ? */) {/* return turn; */}
  show() {}
  declareResult() {}
  
  get players() {}
  get over() {}
}

export class ViewStateRules extends Game {
  constructor(view, state, rules) {
    super();
    this.view = view;
    this.state = state;
    this.rules = rules;
  }
  
  doTurns(turns) {
    this.rules.doTurns(this.state, turns);
  }
  
  async inputTurn(player) {
    return this.view.inputTurn(this.state, player);
  }
  
  show() {
    this.view.show(this.state);
  }
  
  declareResult() {
    this.view.declareResult(this.state, this.over);
  }
  
  get players() {
    // For now, use state for this:
    return this.state.players;
  }
  
  get over() {
    return this.rules.gameover(this.state);
  }
}

/* 

Old Game class.
Included here because it has somewhat useful comments.

class Game {
  constructor() {
    // ---
    // Is an array of  {name: 'Player Name', active: true, ...}.
    // (active-ness is used by controllers to manage when people take turns).
    this.players = [];
  }
  get state() {
    // Should output serialisable game-state, such that:
    //   for all games g1, g2:
    //   if String(g1.state) === String(g2.state), then:
    //   for all moves (or indeed move-descriptions) m:
    //   if g1.isLegal(m), then: g2.isLegal(m)
  }
  update(move) {
    // Should accept a move-description, and use it to update the state.
    // A single move-possibility may have multiple distinct possible descriptions,
    //   so long as they all update to equivalent states (see above).
    // If the move(-description) is invalid, update should throw an InvalidMoveError.
  }
  get over() {
    // Returns true if the game is over, false otherwise.
  }
  get result() {
    // Returns a result if the game is over.
    // (If the game is not over, could be anything).
  }
}

*/