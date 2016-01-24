import objectAssign from "object-assign";
let direction={down:{row:1},up:{row:-1},right:{col:1},left:{col:-1}};
export default class MoveHelper{
  constructor(){

  }
  doMove(move,board){
    var isValid = this.isMoveValid(move,board);
  }

  isMoveValid(move,board){
    //place all pieces on the board
    //do all the pieces have the same column or row
    var valid = this.checkRowColumns(move);
    if (valid.sameRow || valid.sameColumn) {
      move.forEach((m)=> {
        var row = m.location.row;
        var column = m.location.column;
        var piece = m.piece;
        board[row][column] = piece;
      });
    }
  }
  checkRowsColumns(move){
    var rows = move.map((m)=>{return m.location.row;});
    var columns = move.map((m)=>{return m.location.column;});
    var sameRow =true;
    var sameColumn = true;
    var rCount = rows.length;
    var cCount = columns.length;
    var count = 0;
    while(count < rCount -1){
      if (rows[count]!=rows[count+1]) {sameRow=false;break;}
      count++;
    }
      count=0;
      while(count < cCount -1){
        if (columns[count]!=columns[count+1]){ sameColumn=false;break;}
      }


    return {sameRow:sameRow,sameColumn:sameColumn};
  }
  playerMove(newState,cell,Game){


    var piece = this.findSelectedPiece(newState.game.players[newState.currentPlayer].pieces);
    var score = this.validateMove(piece,cell,newState);
    if (newState.boardIsEmpty || score > 0) {

      piece.selected = false;
      piece.played = true;
      var pieceId = piece.id;
      newState.lastPiecesPlayed.push({cell: cell, piece: piece});
      newState.game.players[newState.currentPlayer].pieces[pieceId] = {color: 0, shape: 0};
      newState.game.board[cell.row][cell.column] = piece;
      newState.boardIsEmpty = false;
      newState.moveScore = newState.moveScore + score;
      newState = Game.checkForAddRowColumn(newState, cell);
    }

    return newState;
  }
   findSelectedPiece(pieces) {
    var piece;
    Object.keys(pieces).forEach((p)=> {
      if (pieces[p] != null) {
        if (pieces[p].selected == true) {
          piece = pieces[p];
        }
      }

    });
    return piece;
  }
   validatePieces(pieces){
    var shapes = [];
    var colors = [];
    var count = pieces.length;
    pieces.map((p)=>{
      console.log("checking piece",p);
      if (shapes.indexOf(p.shape)< 0){
        shapes.push(p.shape);
      }
      if (colors.indexOf(p.color) < 0) {
        colors.push(p.color);
      }
    });
    console.log(`shapes:${shapes.length},colors:${colors.length}`);
    if (shapes.length == count && colors.length==1) return {score:shapes.length==6 ? 12 : shapes.length, valid:true};
    if (shapes.length == 1 && colors.length == count) return {score:colors.length==6 ? 12 : colors.length,valid: true};
    return {score:0,valid:false};


  }

   validateMove(currentPiece,cell,state){


    var row = Number(cell.row);
    var board = objectAssign({},state.game.board);
    var currentColumns = state.currentColumns;
    var currentRows = state.currentRows;
    var column = Number(cell.column);
    var totalScore = 0;
    Object.keys(direction).forEach((key)=>{
      var pieces =[];
      if (direction[key].hasOwnProperty("row"))
      {
        for(let i=0;i<6;i++){
          if (i==0) {pieces.push(currentPiece);}
          else {
            var newRow = row + (direction[key].row * i);
            console.log(`Row Check - ${newRow}:${column} - current ${direction[key].row}`);
            if (newRow > currentRows || newRow < 1) break;
            let piece = board[newRow][column];
            if (piece.shape != 0) {
              pieces.push(piece);
            }
            else {
              break;
            }
          }
        }
        if (pieces.length>1){
          let score = this.validatePieces(pieces);
          if (score.valid){
            totalScore=totalScore + score.score;
          }
        }
      }
      if (direction[key].hasOwnProperty("col"))
      {
        for(let i=0;i<6;i++){
          if (i==0) {pieces.push(currentPiece);}
          else {
            var newColumn = column + (direction[key].col * i);
            console.log(`Column Check - ${row}:${newColumn}:current:${direction[key].col}`);
            if (newColumn > currentColumns || newColumn < 1) break;
            let piece = board[row][newColumn];
            if (piece.shape != 0) {
              pieces.push(piece);
            }
            else {
              break;
            }
          }
        }
        if (pieces.length>1){
          let score = this.validatePieces(pieces);
          if (score.valid){
            totalScore=totalScore + score.score;
          }
        }
      }



    });
    return totalScore;
  }
  finishMove(newState,game) {
    newState.lastPiecesPlayed = [];
    Object.keys(newState.game.players[newState.currentPlayer].pieces).forEach((id)=> {
      if (newState.game.players[newState.currentPlayer].pieces[id].shape == 0) {
        var newPiece = game.getNewPiece();
        newPiece.id = id;
        newState.game.players[newState.currentPlayer].pieces[id] = newPiece;
      }
    });
    newState.game.players[newState.currentPlayer].score = newState.game.players[newState.currentPlayer].score + newState.moveScore;
    newState.moveScore = 0;
    newState.currentPlayer++;
    newState.remainingPieces = game.getRemainingPieces();
    if (newState.currentPlayer > newState.numberOfPlayers) newState.currentPlayer = 1;
    return newState;
  }

   undoMove(newState,Game){
    var locations = [];
    Object.keys(newState.game.players[newState.currentPlayer].pieces).forEach((x)=> {

      if (newState.game.players[newState.currentPlayer].pieces[x] == null) locations.push(x);

    });
    var count = 0;
    console.log("last played locations", newState.lastPiecesPlayed);
    locations.map((l)=> {

      console.log("lastplayed", newState.lastPiecesPlayed[count]);
      newState.lastPiecesPlayed[count].piece.selected = false;
      newState.lastPiecesPlayed[count].piece.played = false;
      newState.game.players[newState.currentPlayer].pieces[l] = newState.lastPiecesPlayed[count].piece;
      var row = newState.lastPiecesPlayed[count].cell.row;
      var column = newState.lastPiecesPlayed[count].cell.column;
      newState.game.board[row][column] = {color: 0, shape: 0, row: row, column: column};

      count++;
    });
    newState.lastPiecesPlayed = [];
    console.log("newState Undo", newState);
    return newState;
  }
   selectPiece(newState, piece) {
    var id = piece.id;
    for (var x in newState.game.players[newState.currentPlayer].pieces) {
      if (newState.game.players[newState.currentPlayer].pieces[x] != null) {
        newState.game.players[newState.currentPlayer].pieces[x].selected = false;

        if (newState.game.players[newState.currentPlayer].pieces[x].id == id) {
          newState.game.players[newState.currentPlayer].pieces[x].selected = true;
        }
      }
    }
    return newState;
  }


}
