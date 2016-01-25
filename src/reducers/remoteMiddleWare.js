import * as types from '../constants/ActionTypes';

export default  socket => store => next => action => {
  console.log("in middleware",action);
  if (action.type == types.CREATE_GAME
      || action.type == types.START_GAME
      || action.type == types.FINISH_MOVE
      || action.type == types.PLAYER_MOVE
      || action.type ==types.GET_AWAITING_GAMES
      || action.type == types.JOIN_GAME
  ) {
    console.log("in the if statement", store.getState());
    socket.emit('socketHandler',store.getState(), action);
    return;
  }
  //if (action.type==types.START_NEW_GAME){
  //  socket.emit('startGame',action.settings);
  //}
  //if (action.type==CONNECTION_MADE){
  //  socket.emit("getAwaitingGames");
  //  return;
  //}
  //if (action.type==JOIN_GAME){
  //  socket.emit("joinGame",action.settings,action.gameName);
  //  return;
  //}
  //if (action.type==MOVE_SELECTED){
  //  console.log("move action", action);
  //  if (action.settings.goodLocation==true) {
  //    console.log("Move Selected")
  //    socket.emit("playerMoved", action.settings);
  //    action.type=ON_MOVE_SELECTED;
  //  }
  //  else {
  //    return;
  //  }
  //}

  return next(action);
}
