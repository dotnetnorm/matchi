var board = {};
export default class BoardHelper {
  constructor() {
    this._setupNewBoard();
  }
  getBoard(){
    return board;
  }
  _setupNewBoard() {
    var r = {};
    for (var row = 1; row <= 6; row++) {


      var c={};
      for (var column = 1; column <= 6; column++) {
        var cell = {color: 0, shape: 0,row:row,column:column};
        c[column]=cell;
      }
      r[row]=c;
    }
    board = r;
  }

   getColumns(columns,row){
    var newColumns={};
    for(var i =1;i<=columns;i++){
      newColumns[i]= {color: 0, shape: 0,row:row,column:i};
    }
    return newColumns;
  }

   addRowToEnd(board,currentRows,currentColumns){
    var newRow = currentRows+1;
    board[newRow] = this.getColumns(currentColumns,newRow);
    return board;
  }
   addColumnToEnd(board,currentRows,currentColumns){
    var newColumn = currentColumns+ 1;
    Object.keys(board).forEach((row)=>{
      board[row][newColumn] ={color: 0, shape: 0,row:row,column:newColumn};
    });
    return board;
  }
   setNewColumn(column,newColumn){
    column.column = newColumn;
    return column;
  }
   addColumnToFront(board,currentRows,currentColumns) {
    var newColumn = currentColumns +1;
    board = this.addColumnToEnd(board,currentRows,currentColumns);
    Object.keys(board).forEach((row)=>{
      for(var column =newColumn;column>1;column--){
        board[row][column]=this.setNewColumn(board[row][column-1],column);
      }
      board[row][1]={color: 0, shape: 0,row:row,column:1};
    });
    return board;
  }
   setNewRow(row,newRow){
    Object.keys(row).forEach((c)=>{
      row[c].row=newRow;
    });
    return row;
  }
   addRowToFront(board,currentRows,currentColumns) {
    var newRow = currentRows+1;
    board= this.addRowToEnd(board,currentRows,currentColumns);
    for(var row = newRow;row>1;row--){
      board[row]=this.setNewRow(board[row-1],row);

    }
    board[1]=this.getColumns(currentColumns,1);
    return board;
  }

   checkForAddRowColumn(state,cell){

    if (cell.row==state.currentRows){
      state.game.board = this.addRowToEnd(state.game.board,state.currentRows,state.currentColumns);
      //state.lastPiecesPlayed = updateLastPiecesPlayed(state.lastPiecesPlayed,{row:-1});
      state.currentRows = state.currentRows +1;
    }
    if (cell.column==state.currentColumns){
      state.game.board = this.addColumnToEnd(state.game.board,state.currentRows,state.currentColumns);
      //state.lastPiecesPlayed = updateLastPiecesPlayed(state.lastPiecesPlayed,{column:-1});
      state.currentColumns = state.currentColumns + 1;
    }
    if(cell.column == 1){
      state.game.board = this.addColumnToFront(state.game.board,state.currentRows,state.currentColumns);
      state.lastPiecesPlayed = this.updateLastPiecesPlayed(state.lastPiecesPlayed,{column:1});
      state.currentColumns = state.currentColumns + 1;
    }
    if (cell.row==1){
      state.game.board = this.addRowToFront(state.game.board,state.currentRows,state.currentColumns);
      state.lastPiecesPlayed = this.updateLastPiecesPlayed(state.lastPiecesPlayed,{row:1});
      state.currentRows = state.currentRows +1;
    }
    console.log("state at end of check",state);
    return state;
  }

  updateLastPiecesPlayed(lastPiecesPlayed,operation){
    for(var i=0;i<lastPiecesPlayed.length;i++){
      if (operation.row) {
        console.log("updateing row");
        lastPiecesPlayed[i].cell.row = lastPiecesPlayed[i].cell.row + (operation.row);
      }
      if (operation.column){
        console.log("updating columns");
        lastPiecesPlayed[i].cell.column = lastPiecesPlayed[i].cell.column + (operation.column);
      }
    }
    return lastPiecesPlayed;
  }

}
