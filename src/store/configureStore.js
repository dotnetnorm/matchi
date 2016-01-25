//This file merely configures the store for hot reloading.
//This boilerplate file is likely to be the same for each project that uses Redux.
//With Redux, the actual stores are in /reducers.
/* global __DEVELOPMENT__, __CLIENT__, __DEVTOOLS__ */
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import middleware from '../reducers/remoteMiddleWare';

//import { devTools, persistState } from 'redux-devtools';
import gameState from "../reducers/matchiApp";

const __DEVELOPMENT__ = true;




export default function configureStore(socket) {

  let finalCreateStore;

  finalCreateStore = applyMiddleware(middleware(socket))(createStore);


  const reducer = combineReducers({gameState});
  const store = finalCreateStore(reducer);


  if (module.hot) {
    module.hot.accept('../reducers/index', () => {
      const nextReducer = combineReducers({gameState});
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
