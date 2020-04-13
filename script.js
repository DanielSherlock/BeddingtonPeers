function switchFromTo(from, to) {
  document.getElementById(from).style.display = 'none';
  document.getElementById(to).style.display = 'block';
}

function startGame() {
  // pass
}

function lobbyStart() {
  var peer = new Peer();
  peer.on('open', function(id) {
    document.getElementById('player-code').innerHTML = id;
  });
  peer.on('connection', startGame);
  switchFromTo('lobby-mainmenu', 'lobby-start');
}

function main() {
  document.getElementById('start-button').addEventListener('click', lobbyStart);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', main);
} else {
  main();
}
