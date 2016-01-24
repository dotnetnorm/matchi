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

