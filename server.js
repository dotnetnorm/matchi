var port = process.env.PORT || 1337;
var express = require('express'),
  app = express(),
  path = require('path'),
  server = app.listen(port),
  io = require('socket.io')(server);
var objectAssign= require("object-assign");
var Redis = require('ioredis');
var redis = new Redis();
var gamesAwaiting=[];
var gamesInProgress = [];
var types = require("./src/constants/nodeActionTypes");
import  Game from "./src/businessLogic/gameHelper";

app.use(express.static(path.join(__dirname, './dist')));

io.on('connection', function (socket) {
  console.log('User connected. Socket id %s', socket.id);

  socket.on('socketHandler',function(state,action){
    console.log("State ", state);
    console.log("Action", action);
    switch (action.type) {

      case types.CREATE_GAME:
            var gameName = state.gameState.playerInfo.gameName;
            var playerName = state.gameState.playerInfo.name;
            var game=Game.createGame(gameName,playerName);
            game = Game.addPlayer(game,playerName);
            console.log("game created", game);
            gamesAwaiting.push(game);
            action.games = gamesAwaiting;
            action.type = types.GAMES_AWAITING;
            socket.room = gameName;
            socket.join(gameName);
            io.emit("socketHandler",state,action);
            break;
      case types.JOIN_GAME:
            var gameName = action.gameName;
            var playerName = state.gameState.playerInfo.name;
            var gameIndex = gamesAwaiting.findIndex(x=>x.gameName==gameName);
            var game = gamesAwaiting[gameIndex];
            game = Game.addPlayer(game,playerName);
            gamesAwaiting[gameIndex] = game;
            action.games = gamesAwaiting;
            action.type = types.GAMES_AWAITING;
            socket.join(gameName);
            socket.broadcast.emit("socketHandler",state,action);
            break;
      case types.GET_AWAITING_GAMES:
           action.type = types.GAMES_AWAITING;
           action.games = gamesAwaiting;
           socket.emit("socketHandler",state,action);
           break;
      case types.SELECT_PIECE:
          var state = Game.selectPiece(objectAssign({}, state), action.piece);
          action.type = types.PIECE_SELECTED;
          socket.broadcast.to(state.gameName).emit("socketHandler",state,action);
            break;

      case types.PLAYER_MOVE:
          var newState =  Game.playerMove(objectAssign({}, state),action.cell);
            action.type=types.PLAYER_MOVED;
            socket.broadcast.to(state.gameName).emit("socketHandler",newState,action);
            break;

      case types.FINISH_MOVE:
        var finishState =  types.Game.finishMove(objectAssign({}, state));
            action.type = types.MOVE_FINISHED;
            socket.broadcast.to(state.gameName).emit("socketHandler",finishState,action);
            break;

      case types.UNDO_MOVE:
        var undoState =  Game.undoMove(objectAssign({},state));
            action.type = types.MOVE_UNDONE;
            socket.broadcast.to(state.gameName).emit("socketHandler",undoState,action);
            break;

      default:
        socket.broadcast.to(state.gameName).emit("socketHandler",state,action);

    }
  });


  socket.on('joinGame', function (settings,gameName) {

      var gameIndex = gamesAwaiting.findIndex(g=>g.gameName==gameName);

      if (gameIndex == -1){
          socket.emit("gameJoinError","Game No Longer Awaiting");
          return;
      }
      gamesAwaiting.splice(gameIndex,1);
      var gameInfo = {gameName:gameName,players:{player1:gameName,player2:settings.playerName}};
      gamesInProgress.push(gameInfo);
      socket.emit("gameJoined",{gameInfo:gameInfo,gamesAwaiting:gamesAwaiting});
      socket.broadcast.emit("gameJoined",{gameInfo:gameInfo,gamesAwaiting:gamesAwaiting});
      //socket.broadcast.emit("awaitingGames",gamesAwaiting);

  });
  socket.on("getAwaitingGames",function(settings){
    socket.emit("awaitingGames",gamesAwaiting);
  });
  socket.on('startGame',function(settings){
      socket.join(settings.playerName);
      gamesAwaiting.push({gameName:settings.playerName});
      socket.broadcast.emit("newGame",settings.playerName);

  });

  socket.on('leaveGame', function () {



  });
  socket.on("playerMoved", function(action){
    var response = {currentPlayer:action.currentPlayer,
                  flipLocations:action.flipLocations,
                  lastPosition:action.lastPosition,
                  gameName:action.gameName
    };
    console.log("player moving",response);
    socket.broadcast.emit("playerMoved",response);
  });

  socket.on('disconnect', function () {
    console.log('User disconnected. Socket id %s', socket.id);
  });
});


//http.listen(port);
