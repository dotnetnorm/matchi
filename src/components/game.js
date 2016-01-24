import React,{PropTypes} from "react";

var Piece = (props) => {

  const {piece} = props;
  let pieceStyle = {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "35px",
    display: "flex",
    height: "50px",
    width: "50px",
    margin: "5px",
    backgroundColor: "black"
  };
  let selectedPieceStyle = {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "35px",
    display: "flex",
    height: "50px",
    width: "50px",
    margin: "5px",
    backgroundColor: "white",
    border: "1px solid black"
  };
  let playedPiece = {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "35px",
    display: "flex",
    height: "50px",
    width: "50px",
    backgroundColor: "black"
  };
  let style = piece != null ? {color: piece.color} : {};
  let className = piece != null ? `fa fa-${piece.shape}` : "";
  let divStyle = piece != null ? piece.played ? playedPiece : piece.selected ? selectedPieceStyle : pieceStyle : {};
  return (<div style={divStyle}><i className={className} style={style}/></div>);
};
Piece.propTypes = {
  piece:PropTypes.object.isRequired
};

var PlayerBoard = (props)=>{
    const {pieces} = props;
    const {actions} = props;
    return (<div>
      <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>{Object.keys(pieces).map((key)=>{
      let p = pieces[key];

          return (<div key={key} onClick={actions.selectPiece.bind(null,pieces[key])} ><Piece piece={p}/></div>);

    })}</div></div>);
};

PlayerBoard.propTypes={
  //game:PropTypes.object.isRequired,
  player:PropTypes.string.isRequired,
  actions:PropTypes.object.isRequired,
  pieces:PropTypes.object.isRequired


};

var Board = (props) =>
{
    const {board,actions} = props;
    return (<div style={{height:"100%",width:"100%",overflow:"scroll",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>{
    Object.keys(board).map((r)=>{
      return (<div key={r} style={{display:"flex"}}>
        {Object.keys(board[r]).map((c)=>{
          return (<div key={c} style={{float:"left",minHeight:"50px",minWidth:"50px",border:"1px solid black"}} onClick={actions.playerMove.bind(null,board[r][c])}>
            {board[r][c].shape!=0 ? <Piece piece={board[r][c]} /> : <div></div>}</div>);
        })}<div style={{clear:"both"}}></div></div>);})}</div>);


};
Board.propTypes={
  board:PropTypes.object.isRequired,
  actions:PropTypes.object.isRequired
};

var MoveButtons = (props) => {
  const {actions} = props;
  return <div><button type="button" onClick={actions.undoMove}>Undo</button><button type="button" onClick={actions.finishMove}>Done</button></div>;
};
MoveButtons.propTypes={
  actions:PropTypes.object.isRequired
};
var PlayerScore = (props)=>{
  const {score,playerNumber} = props;
  return <div>{`Player ${playerNumber}`}<br/>{`${score}`}</div>;
};
PlayerScore.propTypes={
  score:PropTypes.number.isRequired,
  playerNumber:PropTypes.string.isRequired
};

var Ramaining = (props) => {
  const {pieces} = props;

};


export default class GameBoard extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    const {actions,currentPlayer,game,remaining,moveScore} = this.props;

    return(
       <div style={{display:"flex"}}>
        <div style={{display:"flex",flexDirection:"column"}}>

        {Object.keys(game.players).map((player)=>{
            return(<div key={`player${player}`} style={{display:"flex",flexDirection:"column"}}>
            {currentPlayer == player ? <PlayerBoard key={player} pieces={game.players[player].pieces} currentPlayer={currentPlayer} actions={actions} player={player} />
                                     : <div key={player}></div>}</div>);
        })}<MoveButtons actions={actions}/> {moveScore}
          <div style={{display:"flex",flexDirection:"column"}}>
          {Object.keys(game.players).map((player)=>{
            return <PlayerScore key={`score${player}`} score={game.players[player].score} playerNumber={player} />;
          })}
            </div></div>


         <Board board={game.board} actions={actions} /><div style={{position:"absolute",bottom:"0",left:"0"}} />
        </div>





    );
  }

}
GameBoard.propTypes={
  game:PropTypes.object.isRequired,
  actions:PropTypes.object.isRequired,
  currentPlayer:PropTypes.number.isRequired,
  moveScore:PropTypes.number.isRequired,
  remaining:PropTypes.object.isRequired

};
