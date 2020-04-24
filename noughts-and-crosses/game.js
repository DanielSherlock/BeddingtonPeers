import {ViewStateRules} from '../game.js';
import {AutoInactivePlayer} from '../view.js';

import {CanvasView} from './view.js';
import {NoughtsAndCrossesState} from './state.js';
import {NoughtsAndCrossesRules} from './rules.js';

export class NoughtsAndCrosses extends ViewStateRules {
  constructor(id) {
    super(
      new AutoInactivePlayer(new CanvasView(id)),
      new NoughtsAndCrossesState(),
      new NoughtsAndCrossesRules()
    )
  }
}