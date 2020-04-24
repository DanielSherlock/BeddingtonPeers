import {View} from '../view.js';

import {
  CanvasComponent,
  Cell,
  V_Line,
  H_Line
} from '../canvas-component.js';

export class CanvasView extends View {
  constructor(canvas, {players, board}) {
    super();
    
    this.board = new CanvasComponent(0, 0);
    for (let y of board.keys()) {
      let row = new CanvasComponent(0, 0);
      for (let x of board[y].keys()) {
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
    
    this.canvas = canvas;
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
