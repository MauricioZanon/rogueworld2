import { combineReducers, createStore } from 'redux';
import centroPantalla, { CentroPantallaActions } from './reducers/centroPantalla';
import mensajesConsola, { MensajesConsolaActions } from './reducers/mensajesConsola';

const reducer = combineReducers({
  centroPantalla,
  mensajesConsola
});

export const store = createStore(reducer);

export type StoreAction = CentroPantallaActions | MensajesConsolaActions
