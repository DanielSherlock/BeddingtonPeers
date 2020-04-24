import {ViewStateRules} from '../game.js';
import {AutoInactivePlayer} from '../view.js';

import {CanvasView} from './view.js';
import {NoughtsAndCrossesState} from './state.js';
import {NoughtsAndCrossesRules} from './rules.js';

export class NoughtsAndCrosses extends ViewStateRules {
  constructor(id) {
    let state = new NoughtsAndCrossesState();
    let view = new AutoInactivePlayer(
      new CanvasView(id, state)
    );
    // For the moment not passing state to rules.
    let rules = new NoughtsAndCrossesRules();
    
    super(view , state, rules);
  }
}