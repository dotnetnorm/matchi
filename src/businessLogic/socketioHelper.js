import io from "socket.io-client";
import configureStore from "../store/configureStore";
import * as actions from "../actions/gameActions";
import * as types from "../constants/ActionTypes";
const socket = io(`${location.protocol}//${location.hostname}:1337`);
var store = null;

export default class Socket
{
  constructor(){
    store =  configureStore(socket);

  }
  getStore(){
    return store;
  }

}
socket.on('connect', ()=> {

  store.dispatch(actions.socketHandler(null,{type:types.GET_AWAITING_GAMES}));
  console.log("connected to socket io");
});
socket.on('socketHandler', (state,action) => {
  console.log("socket handler", state,action);

  store.dispatch(actions.socketHandler(state,action));
});


