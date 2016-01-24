import {PLACE_PIECE,SELECT_PIECE,PLAYER_MOVE,FINISH_MOVE,UNDO_MOVE} from '../constants/ActionTypes';
import objectAssign from 'object-assign';
import GameHelper from "../businessLogic/gameHelper";

let Game = null;

const initialState = {
  game: {},
  lastPiecesPlayed: [],
  currentPlayer: 0,
  numberOfPlayers:0,
  currentRows:6,
  currentColumns:6,
  boardIsEmpty:true,
  moveScore:0,
  remainingPieces: [],
  piecesCounted:[],
  gameStarted:false,
  playerInfo :{name:'',playerNumber:0}
};


export default function matchiApp(state = initialState, action) {

  switch (action.type) {
    case SELECT_PIECE:
     return Game.selectPiece(objectAssign({}, state), action.piece);

    case PLAYER_MOVE:
      return Game.playerMove(objectAssign({}, state),action.cell);

    case FINISH_MOVE:
      return Game.finishMove(objectAssign({}, state));

    case UNDO_MOVE:
      return Game.undoMove(objectAssign({},state));

    default:
      return state;
  }
}
