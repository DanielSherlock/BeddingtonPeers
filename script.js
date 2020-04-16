// Game functions:

const PLAYER1 = 0;
const PLAYER2 = 1;

function startDUMMY_game() {
  const DUMMY_SETUP = {
    p1o: function(m) {
      this.p2i(m)
    },
    p2o: function(m) {
      this.p1i(m);
    },
    rp1i: function(f) {
      this.p1i = f;
    },
    rp2i: function(f) {
      this.p2i = f;
    }
  };
  startGame(DUMMY_SETUP.rp1i, DUMMY_SETUP.p1o,
            DUMMY_SETUP.rp2i, DUMMY_SETUP.p2o)
};

function turn(currentPlayer, send) {
  return function(prevTurn) {
    // Dummy turns:
    switch (prevTurn) {
      case 'n':
        let turn = '';
        while (turn != 'n' && turn != 'w' && turn != 'l') {
          turn = promt(currentPlayer + '\'s turn! [n/w/l]');
        }
        send({});
        break;
      case 'l':
        alert(currentPlayer + ': Well done! You have won.');
        break;
      case 'w':
        alert(currentPlayer + ': You lost! Better luck next time.');
        break;
      default:
        alert('There has been an error. The system did not recieve a valid turn from your opponent.');
    }
  }
}

function startGame(registerPlayer1_in, player1_out,
                   registerPlayer2_in, player2_out) {
  registerPlayer1_in(turn(PLAYER1, player1_out));
  registerPlayer2_in(turn(PLAYER2, player2_out));
  turn(PLAYER1, player1_out)('n'); // Dummy prevTurn
}

// Menu functions:

function switchFromTo(from, to) {
  document.getElementById(from).style.display = 'none';
  document.getElementById(to).style.display = 'block';
}

// Local functions:

function startLocalGame() {
  switchFromTo('local-menu', 'game');
  alert('Alrighty then!');
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
