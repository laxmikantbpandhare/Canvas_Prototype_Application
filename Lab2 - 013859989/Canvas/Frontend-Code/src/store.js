import {createStore, applyMiddleware} from "redux";
import thunk from 'redux-thunk';
import {compose } from "redux";
import rootReducer from "./components/reducers";
import promise from "redux-promise";
//import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

const initialize ={};

const middleware = [thunk];
// compose(
//     applyMiddleware(...middleware),
//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// )
const store = createStore(rootReducer,initialize,
    compose(
    applyMiddleware(...middleware)//,
  //  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
    );
//const composePlugin = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
//const store = createStore(rootReducer, composePlugin(applyMiddleware(promise)));
export default store;