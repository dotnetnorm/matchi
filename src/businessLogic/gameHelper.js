import PiecesHelper from "./piecesHelper";
import MoveHelper from "./moveHelper";
import BoardHelper from "./boardHelper";
import objectAssign from 'object-assign';

const piecesHelper = new PiecesHelper();
const moveHelper = new MoveHelper();
const boardHelper = new BoardHelper();
const colors = ['red','blue','green','yellow','orange','purple'];
const shapes=['circle','certificate','heart','square','cloud','star'];

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
    console.log("add Player", game, playerName);
    var tempGame = objectAssign({},game);
    var nextPlayer = tempGame.numberOfPlayers + 1;
    tempGame.numberOfPlayers = nextPlayer;
    tempGame.players[nextPlayer] = {playerName:playerName,score:0,pieces:{}};
    console.log("temp game",tempGame);
    return tempGame;
  }
  static startGame(game){
    var players = game.numberOfPlayers;
    game.board = boardHelper.getBoard();
    for (var i = 1; i <= players; i++) {
      game.players[i] = {pieces: {}, score: 0};
    }
    game.pieces = PiecesHelper.initialPieces();


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

    game.players = this.arrangePlayers(game.players,players);



    return game;

  }
  static getLongestMatch(pieces){
    var pieceShapes = {};
    var pieceColors = {};

    for(var i = 0; i<6;i++){
      pieceShapes[shapes[i]] = [];
      pieceColors[colors[i]] = [];
    }
    pieces.map((p)=>{
      if (pieceShapes[p.shape].indexOf(p.color) < 0) {pieceShapes.push(p.color);}
      if (pieceColors[p.color].indexOf(p.shape) < 0)  {pieceColors.push(p.shape);}
    });
    var longest = 0;
    Object.keys(pieceColors).forEach((key)=>{
      if (pieceColors[key].length > longest) {longest = pieceColors[key].length; }
    });
    Object.keys(pieceShapes).forEach((key)=>{
      if (pieceShapes[key].length > longest) {longest = pieceShapes[key].length; }
    });
    return longest;


  }
  static arrangePlayers(players,totalPlayers){
    var orderedPlayers = {};
    var currentLeader = 0;
    var currentLongest = 0;
    Object.keys(players).forEach((key)=>{
        var longest = this.getLongestMatch(players[key].pieces);
        if (longest > currentLongest){
          currentLeader = key;
          currentLongest = longest;
        }
    });
    if (currentLongest ==1 ) return players;
    orderedPlayers[1] = players[currentLongest];
    var count = 2;
    var currentPlayer = currentLongest + 1;
    while(count <= totalPlayers){
          if (currentPlayer > totalPlayers) currentPlayer = 1;
          orderedPlayers[count]=players[currentPlayer];
          currentPlayer++;
          count++;
    }

    return orderedPlayers;

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
