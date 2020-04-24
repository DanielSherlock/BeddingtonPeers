import {localController} from './controllers.js';
import {ViewStateRules} from './game.js';
import {CanvasView} from './view.js';
import {NoughtsAndCrossesState} from './state.js';
import {InvalidMoveError,
        NoughtsAndCrossesRules} from './rules.js';

// Game Code:
// ----------

class Rule {
  constructor () {
    this.partialStates = new Set();
  }
  register(...partialStates) {
    for (let ps of partialStates) {
      this.partialStates.add(ps);
    }
  }
  read(step) { }
  then(rule) {
    return {
      ...new Rule(),
      register: (...partialStates) => {
        this.register(partialStates);
      },
      read: step => {
        let out = rule.read(step);
        rule.register(this.read(step));
        return out;
      }
    };
  }
}

Rule.AnyCell = class extends Rule {
  
};

// Menu Functions:
// ---------------

function switchFromTo(from, to) {
  document.getElementById(from).style.display = 'none';
  document.getElementById(to).style.display = 'block';
}

function startLocalGame() {
  let game = new ViewStateRules(
    new CanvasView('game-canvas'),
    new NoughtsAndCrossesState(),
    new NoughtsAndCrossesRules()
  )
  localController(game);
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
