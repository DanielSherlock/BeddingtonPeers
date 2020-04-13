function main() {
  var peer = new Peer();
  peer.on('open', function(id) {
    alert('My peer ID is: ' + id);
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', main);
} else {
  main();
}
