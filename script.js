function peerStuff(){
  var peer = new Peer();
  peer.on('open', function(id) {
    alert('My peer ID is: ' + id);
  });
}

function test() {
  alert("seems to work fine");
}

function main() {
  document.getElementById('start-button').addEventListener('click', test);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', main);
} else {
  main();
}
