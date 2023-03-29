import { combineReducers } from "redux";

// Imports: Reducers
import flightReducer from "./flightReducer";

// Redux: Root Reducer
const rootReducer = combineReducers({
  flightReducer: flightReducer,
});

// Exports
export default rootReducer;
