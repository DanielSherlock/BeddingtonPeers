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

import {CanvasComponent,
        Cell,
        V_Line,
        H_Line
       } from './canvas-component.js';

export class CanvasView extends View {
  constructor(id) {
    super();
    
    let template = [[' ', ' ', ' '],
                    [' ', ' ', ' '],
                    [' ', ' ', ' ']];
    this.board = new CanvasComponent(0, 0);
    for (let y of template.keys()) {
      let row = new CanvasComponent(0, 0);
      for (let x of template[y].keys()) {
        if (x > 0) {
          row = row.beside(new V_Line());
        }
        row = row.beside(new Cell({x, y}));
      }
      if (y > 0) {
        this.board = this.board.above(new H_Line());
      }
      this.board = this.board.above(row);
    }
    
    this.canvas = document.getElementById(id);
    this.canvas.height = this.board.height;
    this.canvas.width = this.board.width;
    this.context = this.canvas.getContext('2d');
    
    this.canvas.onEvent = (eventName, func) => {
      let handler = event => {
        if (func(event)) {
          this.canvas.removeEventListener(eventName, handler);
        }
      };
      this.canvas.addEventListener(eventName, handler);
    };
  }
  
  inputTurn({players, board}, player) {
    return new Promise(resolve => {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.board.draw(this.context, board);
      this.canvas.onEvent('click', event => {
        let coords = this.board.identify({
          x: event.clientX - this.canvas.getBoundingClientRect().left,
          y: event.clientY - this.canvas.getBoundingClientRect().top
        }).coords;
        if (board[coords.y][coords.x] === ' ') {
          resolve(`${coords.y},${coords.x}`);
          return true;
        }
      });
    });
  }
}
