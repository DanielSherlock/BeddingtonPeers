# BeddingtonPeers

> Implementation of Beddington Stones using PeerJS

Visit https://danielsherlock.github.io/BeddingtonPeers/ to see the page.

## Progress

Uh, so I can't seem to get the PeerJS connection to open - dunno where the problem is: my code, PeerJS, my home network... It's very irritating. Anyway, consider the P2P part of this project stale for the forseeable future.

The next steps are to start work on the game itself, with fairly hefty decoupling from the comms side of things. Hopefully this will be done in such a way that it's at least easy to play a local game, or switch to something better than PeerJS (i.e. anything that works). All the PeerJS stuff will be left as junk code for now.

## Aims

This is a personal project to implement Beddington Stones. The priority is not to be efficient at all (whether in computation or code length), but to be conceptually simple, and to wherever possible make choices in favour of minimality - less tedious logic, less repetetive graphics, less jumping between code blocks, less html when markdown will do and so on. All while keeping things loosly coupled: it should not be hard to change the UI without touching the game logic, or to change the game without touching the networking/bookkeeping code - and ideally to reuse as many of the old functions while doing so.
