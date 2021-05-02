import { state } from '../../store/store'
import { CentroPantallaActions } from '../reducers/centroPantalla'

export const type: CentroPantallaActions = 'obtenerCentroPantalla'

export default function obtenerCentroPantalla () {
  return {
    type,
    payload: state.player.posicion
  }
}
