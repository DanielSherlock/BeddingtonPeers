class View {
  async inputTurn(state, player) {}
  show(state) {}
  declareResult(state, result) {}
}

export class PromptView extends View {
  inputTurn(state, player) {
    return prompt(`${state}\n${player.name}'s turn:`);
  }
  declareResult(state, result) {
    let description = 'Game over:';
    for (let player of result) {
      description += `\n${player.name} ${player.wins ? 'wins' : 'loses'}.`;
    }
    alert(description);
  }
}

export class ViewWrapper extends View {
  constructor(oldView) {
    super();
    this.view = oldView;
  }
  
  async inputTurn(state, player) {
    return this.view.takeTurn(player, state.board);
  }
  
  declareResult(state, result) {
    this.view.declareResult(result);
  }
}
