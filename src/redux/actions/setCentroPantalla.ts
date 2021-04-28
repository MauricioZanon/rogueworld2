import { state } from '../../store/store';
import { Posicion } from '../../mapa/Posicion';

export const type = "setCentroPantalla";

export default function setCentroPantalla(nuevoCentro: Posicion) {
    return {
        type,
        payload: state.player.posicion
    };

}