import {State} from '../state.js';

export class NoughtsAndCrossesState extends State {
  constructor() {
    super();
    this.players = [{name: 'O', active: true},
                    {name: 'X', active: false}];
    this.board = [[' ', ' ', ' '], [' ', ' ', ' '], [' ', ' ', ' ']];
  }
}