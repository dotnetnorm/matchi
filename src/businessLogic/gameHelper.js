import PiecesHelper from "./piecesHelper";
import MoveHelper from "./moveHelper";
import BoardHelper from "./boardHelper";
import objectAssign from 'object-assign';

const piecesHelper = new PiecesHelper();
const moveHelper = new MoveHelper();
const boardHelper = new BoardHelper();
var game = {players: {}, board: null};
export default class GameHelper {


  constructor(players) {
    console.log("building game");
    game.board = boardHelper.getBoard();
    for (var i = 1; i <= players; i++) {
      game.players[i] = {pieces: {}, score: 0};
    }

    console.log("game ", game);
    for ( i = 1; i <= 6; i++) {
      for (var x = 1; x <= players; x++) {
        var piece = piecesHelper.getNextPiece();
        piece.id=i;
        piece.player = x;
        game.players[x].pieces[i]=piece;
      }
    }
  }

  getGame(){
  //  console.log("returning game", game);
    return game;
  }
  playerMove(state,cell){
    return moveHelper.playerMove(state,cell,this);
  }
  getNewPiece(){
    return piecesHelper.getNextPiece();
  }
  checkForAddRowColumn(newState,cell){
    return boardHelper.checkForAddRowColumn(newState,cell);
  }
  getRemainingPieces(){
    return piecesHelper.getRemainingPieces();
  }
  finishMove(newState){
    return moveHelper.finishMove(newState,this);
  }
  undoMove(newState){
    return moveHelper.undoMove(newState,this);
  }
  selectPiece(newState,piece){
    return moveHelper.selectPiece(newState,piece);
  }

}
