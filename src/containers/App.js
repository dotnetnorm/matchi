// This file bootstraps the app with the boilerplate necessary
// to support hot reloading in Redux
import React, {PropTypes} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Game from '../components/game';
import * as gameActions from '../actions/gameActions';

var Main = (props) =>{
   const {playerInfo,actions} = props;
   return (playerInfo.ready == false ? <div className="panel panel-default"><div className="panel-heading"><div className="panel-title">Your Info</div></div>
     <div className="panel-body">Your Name:<input type="text" value={playerInfo.name} onChange={actions.playerNameChange} />
          <button type="button" className="btn btn-primary" onClick={actions.savePlayerName}>Save</button></div></div>
          :
       <div className="panel panel-default"><div className="panel-heading"><div className="panel-title">Create Game</div></div>
         <div className="panel-body">Game Name:<input type="text" value={playerInfo.gameName} onChange={actions.gameNameChanged} />
           <button type="button" className="btn btn-primary" onClick={actions.createGame}>Save</button></div></div>
   )
};
var GameListItem = (props) => {
  const {game,playerInfo,actions} = props;
  return (<li className="list-group-item">
              <div><h3>{game.gameName}</h3></div>
              <div>Started By {game.creator}</div>
              <div>

                {(game.creator == playerInfo.name) && (game.numberOfPlayers>1) ? <button type="button" className="btn btn-info">Start Game</button> :
                  game.creator != playerInfo.name ?  <button type="button" className="btn btn-primary" onClick={actions.joinGame.bind(null,game.gameName)}>Join</button> :
                  <div>Waiting for more players</div>}


              </div>
          </li>);

};

 var AwaitingGames = (props) =>{
  const {games,playerInfo,actions} = props;
  return (<div className="panel panel-default"><div className="panel-heading"><div className="panel-title">Games Needing Players</div></div>
    <div className="panel-body">
      <ul className="list-group">
        {games.map((game)=>{
          return <GameListItem game={game}  playerInfo={playerInfo} actions={actions} />
        })}
      </ul>
    </div>
  </div>)
};

class App extends React.Component {
  render() {
    const { gameState, actions } = this.props;
    console.log("app state", this.props);
    return (<div>{
    gameState.gameStarted ? 
        <Game game={gameState.game} currentPlayer={gameState.currentPlayer} actions={actions} moveScore={gameState.moveScore} remaining={gameState.remainingPieces}/>
      : <Main playerInfo={gameState.playerInfo} actions={actions} />}
      {gameState.awaitingGames != null ? <AwaitingGames games={gameState.awaitingGames} actions={actions} playerInfo={gameState.playerInfo} /> : <div></div>}</div>

      );

  }
}

App.propTypes = {
  actions: PropTypes.object.isRequired,
  gameState: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  console.log(state);
  return {
    gameState: state.gameState
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(gameActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
