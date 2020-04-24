export class CanvasComponent {
  constructor(width, height, readArgs) {
    this.width = width;
    this.height = height;
    this.readArgs = readArgs;
  }
  draw(context, ...args) {}
  identify(coords) {}
  beside(component) {
    // Note: for now this is a very simple algorithm.
    // Eventually I will add a 'stretch' coefficient to components that will take away all the hard-coding.
    let result = new CanvasComponent(this.width + component.width,
                                     Math.max(this.height, component.height));
    result.draw = (context, ...args) => {
      context.save();
      this.draw(context, ...args);
      context.translate(this.width, 0);
      component.draw(context, ...args);
      context.restore();
    };
    result.identify = coords => {
      if (coords.x < this.width && coords.y < this.height) {
        return this.identify(coords);
      } else if (coords.y < component.height) {
        coords.x -= this.width;
        return component.identify(coords);
      } else {
        return null;
      }
    };
    return result;
  }
  flipped() {
    let result = new CanvasComponent(this.height, this.width);
    result.draw = (context, ...args) => {
      context.save();
      context.transform(0, 1, 1, 0, 0, 0);
      this.draw(context, ...args);
      context.restore();
    };
    result.identify = coords => {
      [coords.x, coords.y] = [coords.y, coords.x];
      return this.identify(coords);
    };
    return result;
  }
  above(component) {
    return this.flipped().beside(component.flipped()).flipped();
  }
}
  
export class Cell extends CanvasComponent {
  constructor(coords) {
    super(60, 60);
    this.coords = coords;
  }
  draw(context, board) {
    switch (board[this.coords.y][this.coords.x]) {
      case 'X':
        context.fillRect(10, 10, 40, 40);
        break;
      case 'O':
        context.beginPath();
        context.arc(30, 30, 20, 0, Math.PI * 2, true);
        context.fill();
        break
    }
  }
  identify(coords) {
    return {type: 'cell', coords: this.coords};
  }
};
  
export class V_Line extends CanvasComponent {
  constructor() {
    super(0, 60); // (*)
  }
  draw(context, ...args) {
    context.beginPath();
    context.moveTo(0, 0);
    context.lineTo(0, 60); // (*)
    context.stroke();
  }
};
  
export class H_Line extends CanvasComponent {
  constructor() {
    super(180, 0); // (*)
  }
  draw(context, ...args) {
    context.beginPath();
    context.moveTo(0, 0);
    context.lineTo(180, 0); // (*) Hard-coded dimensions for simplicity for now.
    context.stroke();
  }
};