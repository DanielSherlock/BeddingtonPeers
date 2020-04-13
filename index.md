---

title: Beddington Stones
script: /script.js

---

## Warning
_Sorry, I can't be bothered not to code in production, so there isn't anything useful here yet._

## Play

<div id="nickname" markdown="1">

Enter a nickname to get started:

<input type="text" id="nickname-text">
<button type="button" id="nickname-button" onclick="alert('Click!')">Go</button>

</div>

<div id="lobby" style="display: none;">

So, this paragraph should not display.

</div>

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
