import PiecesHelper from "./piecesHelper";
import MoveHelper from "./moveHelper";
import BoardHelper from "./boardHelper";
import objectAssign from 'object-assign';

const piecesHelper = new PiecesHelper();
const moveHelper = new MoveHelper();
const boardHelper = new BoardHelper();

export default class GameHelper {


  static createGame(name,playerName){
    var game = {};
    game.gameName = name;
    game.creator = playerName;
    game.players={};
    game.numberOfPlayers = 0;
    return game;
  }
  static addPlayer(game,playerName){
    var tempGame = objectAssign({},game);
    var nextPlayer = tempGame.numberOfPlayers + 1;
    tempGame.numberOfPlayers = nextPlayer;
    tempGame.players[nextPlayer] = {playerName:playerName,score:0,pieces:{}};
    return tempGame;
  }
  static startGame(game,players,name){
    game.gameName = name;
    game.board = boardHelper.getBoard();
    for (var i = 1; i <= players; i++) {
      game.players[i] = {pieces: {}, score: 0};
    }
    game.pieces = PiecesHelper.initialPieces();

    console.log("game ", game);
    for ( i = 1; i <= 6; i++) {
      for (var x = 1; x <= players; x++) {
        var playerPiece = PiecesHelper.getNextPiece(game.pieces);
        var piece = playerPiece.piece;
        game.pieces = playerPiece.pieces;
        piece.id=i;
        piece.player = x;
        game.players[x].pieces[i]=piece;
      }
    }
    return game;

  }


  static playerMove(state,cell){
    return moveHelper.playerMove(state,cell,this);
  }
  static getNewPiece(){
    return PiecesHelper.getNextPiece();
  }
  static checkForAddRowColumn(newState,cell){
    return boardHelper.checkForAddRowColumn(newState,cell);
  }
  static getRemainingPieces(){
    return piecesHelper.getRemainingPieces();
  }
  static finishMove(newState){
    return moveHelper.finishMove(newState,this);
  }
  static undoMove(newState){
    return moveHelper.undoMove(newState,this);
  }
  static selectPiece(newState,piece){
    return moveHelper.selectPiece(newState,piece);
  }

}
