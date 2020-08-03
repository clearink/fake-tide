import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import thunk from "redux-thunk";
import { reducer as focus } from "./focus";
import { reducer as music } from "./music";
import { reducer as timer } from "./timer";
import { reducer as mode } from "./mode";
import { reducer as sleep } from "./sleep";
import { reducer as nap } from "./nap";
import { reducer as breathe } from "./breathe";
import { reducer as data } from "./data";
import { reducer as muse } from "./muse";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers(applyMiddleware(thunk));
const rootReducer = combineReducers({
  focus,
  music,
  timer,
  mode,
  sleep,
  nap,
  breathe,
  data,
  muse,
});
const store = createStore(rootReducer, enhancer);
export default store;
