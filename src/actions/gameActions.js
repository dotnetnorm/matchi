import * as types from '../constants/ActionTypes';

export function playerMove(cell) {
	return { type: types.PLAYER_MOVE, cell };
}

export function selectPiece(piece) {
  console.log(piece);
	return { type: types.SELECT_PIECE, piece };
}
export function undoMove(){
  return {type: types.UNDO_MOVE};
}
export function finishMove(){
  return {type: types.FINISH_MOVE};
}

export function playerNameChange(event){
  var value = event.target.value;
  return {type:types.NAME_CHANGE, value};
}
export function savePlayerName(){
  return {type:types.SAVE_NAME};
}
export function socketHandler(state,action){
  console.log("socket action", state,action);
  return {type:action.type, state, action};
}
export function gameNameChanged(event){
  var value = event.target.value;
  return {type:types.GAME_NAME_CHANGE,value};
}
export function createGame(){
  return {type:types.CREATE_GAME};
}
export function joinGame(gameName){
  return {type:types.JOIN_GAME,gameName};
}
export function gameStarted(game){
  return {type:types.GAME_STARTED,game}
}

