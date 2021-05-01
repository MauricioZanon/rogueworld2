import { MensajesConsolaActions } from '../reducers/mensajesConsola';

const type: MensajesConsolaActions = "obtenerMensajesConsola";

export default function obtenerMensajesConsola(state) {
    return {
        type,
        payload: state.mensajesConsola
    };

}