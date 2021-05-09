import { MensajeConsola } from '../../vistas/gamescreen/utils/MensajeConsola';
import { MensajesConsolaActions } from '../reducers/mensajesConsola';

const type: MensajesConsolaActions = 'agregarMensajeConsola';

export default function agregarMensajeConsola (nuevoMensaje: MensajeConsola) {
  return {
    type,
    payload: nuevoMensaje
  };
}
