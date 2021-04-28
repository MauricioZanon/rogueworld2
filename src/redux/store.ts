import { combineReducers, createStore } from "redux";
import centroPantalla from "./reducers/centroPantalla";

const reducer = combineReducers({
    centroPantalla
});


export const store = createStore(reducer);