export class View {
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

export class AutoInactivePlayer extends View {
  constructor(view) {
    super();
    this.view = view;
  }
  
  async inputTurn(state, player) {
    if (player.active) {
      return this.view.inputTurn(state, player);
    } else {
      return Promise.resolve(null);
    }
  }
  
  show(state) {
    this.view.show(state);
  }
  
  declareResult(state, result) {
    this.view.declareResult(state, result);
  }
}
