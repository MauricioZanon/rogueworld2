import { MensajeConsola } from '../../vistas/gamescreen/utils/MensajeConsola'

export type MensajesConsolaActions = 'agregarMensajeConsola' | 'obtenerMensajesConsola';
type MensajesConsolaState = MensajeConsola[];
type Action = {
    type: MensajesConsolaActions,
    payload?: MensajeConsola;
};

const defaultState: MensajesConsolaState = []

export default function reducer (state: MensajesConsolaState = defaultState, action: Action): MensajesConsolaState {
  switch (action.type) {
    case 'obtenerMensajesConsola':
      return state
    case 'agregarMensajeConsola':
      state = [...state, action.payload]
    default:
      return state
  }
}
