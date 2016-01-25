import * as types from '../constants/ActionTypes';
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
  playerInfo :{name:'',playerNumber:0,ready:false,gameName:''},
  awaitingGames:null

};


export default function matchiApp(state = initialState, action) {

  switch (action.type) {
    case types.GAME_NAME_CHANGE:
          var tempState= objectAssign({},state);
          tempState.playerInfo.gameName=action.value;
          return tempState;
    case types.NAME_CHANGE:
          return objectAssign({},state,{playerInfo:{name:action.value,playerNumber:0,ready:false}});
    case types.SAVE_NAME:
      return objectAssign({},state,{playerInfo:{name:state.playerInfo.name,playerNumber:0,ready:true}});
    case types.SELECT_PIECE:
     return Game.selectPiece(objectAssign({}, state), action.piece);
    case types.PIECE_SELECTED:
          return objectAssign({},state);
    case types.MOVE_FINISHED:
          return objectAssign({},state);
    case types.MOVE_UNDONE:
          return objectAssign({},state);
    case types.GAMES_AWAITING:
          var games = action.action.games;
          console.log("games", state, action.action.games);
          return  objectAssign({},state,{awaitingGames:games});

    case types.PLAYER_MOVE:
      return Game.playerMove(objectAssign({}, state),action.cell);

    case types.FINISH_MOVE:
      return Game.finishMove(objectAssign({}, state));

    case types.UNDO_MOVE:
      return Game.undoMove(objectAssign({},state));

    default:
      return state;
  }
}
