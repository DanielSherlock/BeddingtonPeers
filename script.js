// Game stuff:

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
    //   if g1.state.toString === g2.state.toString, then:
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

/*
const DUMMY_game = {
  setup: () => null,
  players: [{name: 'First', active: true},
            {name: 'Second', active: false}],
  get state() {return this},
  update: function(move) {
    switch (move) {
      case 'n':
        for (let player of this.players) {
          player.active = !player.active;
        }
        break;
      case 'w':
        this.over = true;
        this.result = this.players.map(player => ({name: player.name, wins: player.active}));
        break;
      case 'l':
        this.over = true;
        this.result = this.players.map(player => ({name: player.name, wins: !player.active}));
        break;
      default:
        throw new InvalidMoveError("Not one of 'n', 'w', or 'l'.");
    }
  },
  over: false,
  result: undefined
};
*/

// View stuff:

class View {
  constructor() {}
  takeTurn(player, state) {
    // Given a player and a state, returns that player's choice of move.
  }
  declareResult(result) {
    // Given a result, displays it.
  }
}

const promptView = {
  takeTurn: function(player, state) {
    return prompt(`${state}\n${player.name}'s turn:`);
  },
  declareResult: function(result) {
    let description = 'Game over:';
    for (let player of result) {
      description += `\n${player.name} ${player.wins ? 'wins' : 'loses'}.`;
    }
    alert(description);
  }
};

// Menu functions:

function switchFromTo(from, to) {
  document.getElementById(from).style.display = 'none';
  document.getElementById(to).style.display = 'block';
}

// Local functions:

async function localController(Game, View) {
  const game = new Game();
  const view = new View(game); // ?? passing game to View ??
  while (!game.over) {
    for (let player of game.players.filter(player => player.active)) {
      game.update(await view.takeTurn(player, game.state));
    }
  }
  view.declareResult(game.result);
}

function startLocalGame() {
  localController(DUMMY_game, promptView);
  switchFromTo('local-menu', 'game');
}

// Non-working PeerJS functions:

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

// Good stuff:

function main() {
  // Non-working PeerJS buttons and stuff:
  document.getElementById('nickname-button').addEventListener('click', lobbyMainMenu);
  document.getElementById('start-button').addEventListener('click', lobbyStart);
  document.getElementById('join-button').addEventListener('click', lobbyJoin);
  document.getElementById('player-code-button').addEventListener('click', makeConnection);
  // Local
  document.getElementById('local-start-button').addEventListener('click', startLocalGame);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', main);
} else {
  main();
}
