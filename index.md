---

title: Beddington Stones
script: /script.js

---

## Warning
_Sorry, I can't be bothered not to code in production, so there isn't anything useful here yet._

## Play

<div id="nickname" style="display: none;" markdown="1">

Enter a nickname to get started:

<input type="text" id="nickname-text">
<button type="button" id="nickname-button">Go</button>

</div>

<div id="lobby-mainmenu" markdown="1">

Start a new game, or join a game a friend has started:

<button type="button" id="start-button">Start</button>
<button type="button" id="join-button">Join</button>

</div>

<div id="lobby-start" style="display: none;" markdown="1">

Please give your opponant this code: <code id="player-code">sample</code>

The game will start as soon as they are ready.

</div>

<div id="lobby-join" style="display: none;" markdown="1">

Enter the code your opponent has given you:

<input type="text" id="player-code-text">
<button type="button" id="player-code-button">Go</button>

</div>

<div id="game" style="display: none;" ></div>

## What even is "Beddington Stones"?

Great question,
it's a two-player abstract board game.
Its fun,
but there's long been widespread disagreement as to its name.
This page continues that grand tradition
(while trying to avoid picking a side)
by using an entirely new name for it.
Sorry.

<script src="https://unpkg.com/peerjs@1.0.0/dist/peerjs.min.js"></script>
<script src="{{ page.script | relative_url }}"></script>
