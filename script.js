function switchFromTo(from, to) {
  document.getElementById(from).style.display = 'none';
  document.getElementById(to).style.display = 'block';
}

function startGame(conn, from) {
  return function() {
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
      startGame(conn, 'lobby-start');
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
    startGame(conn, 'lobby-join');
  });
}

function main() {
  document.getElementById('nickname-button').addEventListener('click', lobbyMainMenu);
  document.getElementById('start-button').addEventListener('click', lobbyStart);
  document.getElementById('join-button').addEventListener('click', lobbyJoin);
  document.getElementById('player-code-button').addEventListener('click', makeConnection);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', main);
} else {
  main();
}
