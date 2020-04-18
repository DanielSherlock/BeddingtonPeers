// Generic Stuff:
// --------------

class InvalidMoveError extends Error {
  constructor(message) {
    super(message);
    this.name = 'InvalidMoveError';
  }
}

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

class View {
  constructor() {}
  takeTurn(player, state) {
    // Given a player and a state, returns that player's choice of move.
  }
  declareResult(result) {
    // Given a result, displays it.
  }
}

// Game Code:
// ----------

class NoughtsAndCrosses extends Game {
  constructor() {
    super();
    this.players = [{name: 'O', active: true},
                    {name: 'X', active: false}];
    this.board = [[' ', ' ', ' '], [' ', ' ', ' '], [' ', ' ', ' ']];
  }
  get state() {
    return this.board.map(row => row.join('')).join('\n');
  }
  update(move) {
    let coords = move.split(',', 2).map(n => Number(n));
    for (let player of this.players) {
      if (player.active) {
        if (this.board[coords[0]][coords[1]] === ' ') {
          this.board[coords[0]][coords[1]] = player.name;
        } else {
          throw new InvalidMoveError('Did not play into an empty cell');
        }
      }
      player.active = !player.active;
    }
  }
  get over() {
    const row = (n) => {return (this.board[n][0] == this.board[n][1] &&
                             this.board[n][0] == this.board[n][2] &&
                             this.board[n][0]);};
    const col = (n) => {return (this.board[0][n] == this.board[1][n] &&
                             this.board[0][n] == this.board[2][n] &&
                             this.board[0][n]);};
    const diag1 = () => {return (this.board[0][0] == this.board[1][1] &&
                              this.board[0][0] == this.board[2][2] &&
                              this.board[0][0]);};
    const diag2 = () => {return (this.board[0][2] == this.board[1][1] &&
                              this.board[0][2] == this.board[2][0] &&
                              this.board[0][2]);};
    const notBlank = cell => cell !== ' ' && cell;
    let i = 0;
    let triple = false;
    while (i < 3) {
      triple = triple || notBlank(row(i)) || notBlank(col(i));
      i++;
    }
    triple = triple || notBlank(diag1()) || notBlank(diag2());
    return triple;
  }
  get result() {
    return this.players.map(player => ({...player, wins: this.over === player.name}));
  }
}

// View Code:
// ----------

class PromptView extends View {
  takeTurn(player, state) {
    return prompt(`${state}\n${player.name}'s turn:`);
  }
  declareResult(result) {
    let description = 'Game over:';
    for (let player of result) {
      description += `\n${player.name} ${player.wins ? 'wins' : 'loses'}.`;
    }
    alert(description);
  }
}

const CV = {
  // Companion object for CanvasView
  
  CanvasComponent: class CC {
    constructor(width, height) {
      this.width = width;
      this.height = height;
    }
    draw(context) {}
    handle(event) {}
    beside(component) {
      let result = new CC(this.width + component.width,
                          Math.max(this.height, component.height));
      result.draw = context => {
        context.save();
        this.draw(context);
        context.translate(this.width, 0);
        component.draw(context);
        context.restore();
      };
      result.handle = event => {
        if (event.x < this.width && event.y < this.height) {
          this.handle(event);
        } else if (event.y < component.height) {
          event.x -= this.width;
          component.handle(event);
        }
      };
      return result;
    }
    flipped() {
      let result = new CC(this.height, this.width);
      result.draw = context => {
        context.save();
        context.transform(0, 1, 1, 0, 0, 0);
        this.draw(context);
        context.restore();
      };
      result.handle = event => {
        [event.x, event.y] = [event.y, event.x];
        this.handle(event);
      };
      return result;
    }
    above(component) {
      return this.flipped().beside(component.flipped()).flipped();
    }
  },
  
  Cell: class extends this.CanvasComponent {
    constructor() {
      super(60, 60);
    }
    draw(context) {
      context.fillRect(10, 10, 40, 40);
    }
  },
  
  V_Line: class extends this.CanvasComponent {
    constructor() {
      super(0, 60); // (*)
    }
    draw(context) {
      context.beginPath();
      context.moveTo(0, 0);
      context.lineTo(0, 60); // (*)
      context.stroke();
    }
  },
  
  H_Line: class extends this.CanvasComponent {
    constructor() {
      super(180, 0); // (*)
    }
    draw(context) {
      context.beginPath();
      context.moveTo(0, 0);
      context.lineTo(180, 00); // (*) Hard-coded dimensions for simplicity for now.
      context.stroke();
    }
  }
}

class CanvasView extends View {
  constructor(id) {
    super();
    this.canvas = document.getElementById(id);
    this.canvas.height = 480; // (*)
    this.canvas.width = 480; // (*)
    this.c = this.canvas.getContext('2d');
    (new CV.Cell()).draw(this.c);
    //this.drawBoard([[' ', ' ', ' '], [' ', ' ', ' '], [' ', ' ', ' ']], 0, 0, 480, 480);
  }
  /*drawCell(contents, x, y, dimension) {}
  drawBoard(grid, x, y, width, height) {
    let cellHeight = grid.length;
    let cellWidth = grid[0].length;
    let cellDimension = Math.min(width/cellWidth, height/cellHeight);
    let i = 0;
    while (i < cellWidth) {
      let j = 0;
      while (j < cellHeight) {
        let originX = x + i * cellDimension;
        let originY = y + j * cellDimension;
        if (i > 0) {
          this.c.beginPath();
          this.c.moveTo(originX, originY);
          this.c.lineTo(originX, originY + cellDimension);
          this.c.stroke();
        }
        if (j > 0) {
          this.c.beginPath();
          this.c.moveTo(originX, originY);
          this.c.lineTo(originX + cellDimension, originY);
          this.c.stroke();
        }
        this.drawCell(grid[j][i], originX, originY, cellDimension);
        j++;
      }
      i++;
    }
  }*/
  takeTurn(player, state) {}
  declareResult(result) {}
}

// Controller Code:
// ----------------

async function localController(game, view) {
  while (!game.over) {
    for (let player of game.players.filter(player => player.active)) {
      game.update(await view.takeTurn(player, game.state));
    }
  }
  view.declareResult(game.result);
}

// Menu Functions:
// ---------------

function switchFromTo(from, to) {
  document.getElementById(from).style.display = 'none';
  document.getElementById(to).style.display = 'block';
}

function startLocalGame() {
  localController(new NoughtsAndCrosses(), new CanvasView('game-canvas'));
  switchFromTo('local-menu', 'game');
}

/* Non-working PeerJS menu functions:

function startPeerJSGame(peer, conn, from) {
  return function() {
    alert('If you see this, Peer JS does seem to work - tell me immediately!');
    console.log(peer);
    console.log(conn);
    switchFromTo(from, 'game');
  };
}

function lobbyMainMenu() {
  switchFromTo('nickname', 'lobby-mainmenu');
}

function lobbyStart() {
  const peer = new Peer();
  peer.on('error', function(err) {
    console.log(err);
  });
  peer.on('open', function(id) {
    document.getElementById('player-code').innerHTML = id;
  });
  peer.on('connection', function(conn) {
    conn.on('open', function() { // this is just for testing
      alert('Connected!');
      startPeerJSGame(peer, conn, 'lobby-start');
    });
  });
  switchFromTo('lobby-mainmenu', 'lobby-start');
}

function lobbyJoin() {
  switchFromTo('lobby-mainmenu', 'lobby-join');
}

function makeConnection(){
  const peer = new Peer();
  peer.on('error', function(err) {
    console.log(err);
  });
  const conn = peer.connect(document.getElementById('player-code-text').value);
  conn.on('open', function() { // this is just for testing
    alert('Connected!');
    startPeerJSGame(peer, conn, 'lobby-join');
  });
}
*/

// Page-load Code:
// ---------------

function main() {
  /* Non-working PeerJS buttons and stuff:
  document.getElementById('nickname-button').addEventListener('click', lobbyMainMenu);
  document.getElementById('start-button').addEventListener('click', lobbyStart);
  document.getElementById('join-button').addEventListener('click', lobbyJoin);
  document.getElementById('player-code-button').addEventListener('click', makeConnection);*/
  
  document.getElementById('local-start-button').addEventListener('click', startLocalGame);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', main);
} else {
  main();
}
