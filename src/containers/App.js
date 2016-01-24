// This file bootstraps the app with the boilerplate necessary
// to support hot reloading in Redux
import React, {PropTypes} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Game from '../components/game';
import * as gameActions from '../actions/gameActions';

var Main = (props) =>{
   const {playerInfo,actions} = props;
   return (<div>Your Name:<input type="text" value={playerInfo.name} onChange={actions.playerNameChange} /><button type="button" onClick={actions.savePlayerName}>Save</button></div>)
}


class App extends React.Component {
  render() {
    const { gameState, actions } = this.props;
    console.log("app state", this.props);
    return (
    gameState.gameStarted ?
        <Game game={gameState.game} currentPlayer={gameState.currentPlayer} actions={actions} moveScore={gameState.moveScore} remaining={gameState.remainingPieces}/>
      : <Main playerInfo={gameState.playerInfo} actions={actions} />);

  }
}

App.propTypes = {
  actions: PropTypes.object.isRequired,
  gameState: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    gameState: state.matchiApp
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
