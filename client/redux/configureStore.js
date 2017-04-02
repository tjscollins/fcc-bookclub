import * as redux from 'redux';
import thunk from 'redux-thunk';
import {userSessionReducer, libraryReducer} from 'reducers';

const configureStore = (initialState = {
  userSession: {
    xAuth: null,
    bookCollection: [],
  },
  library: [],
}) => {
  let combinedReducer = redux.combineReducers({
    userSession: userSessionReducer,
    library: libraryReducer,
  });
  let store = redux.createStore(combinedReducer, initialState, redux.compose(redux.applyMiddleware(thunk), window.devToolsExtension
    ? window.devToolsExtension()
    : (f) => f));
  return store;
};

export default configureStore;
