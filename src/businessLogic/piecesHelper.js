
const totalColors = 5;
const totalShapes = 5;
const totalEachCategory = 3;
const colors = ['red','blue','green','yellow','orange','purple'];
const shapes=['circle','certificate','heart','square','cloud','star'];
export default class PiecesHelper{


  static initialPieces(){
    return this._buildPiecesBag();

  }
  static getNextPiece(pieces){
    let indexOfPiece = Math.floor(Math.random()*pieces.length);
    let piece = pieces[indexOfPiece];
    pieces.splice(indexOfPiece,1);
    return {piece:piece,pieces:pieces};
  }
  static _buildPiecesBag(){
    var pieces = [];
   for (var color=0;color<=totalColors;color++) {
     for(var shape=0;shape<=totalShapes;shape++){
       for (var eachCategory=1;eachCategory<=totalEachCategory;eachCategory++){
         let piece={color:colors[color],shape:shapes[shape]};
         pieces.push(piece);
       }
     }
   }
    return pieces;
  }
  static getRemainingPieces(pieces){
    var piecesLeft={};
    shapes.map((s)=>{
      piecesLeft[s]={};
      colors.map((c)=>{
        piecesLeft[s][c] = 0;
      });
    });
       pieces.map((p)=>{
        piecesLeft[p.shape][p.color] = piecesLeft[p.shape][p.color]+1;
    });
    return piecesLeft;
  }

}
