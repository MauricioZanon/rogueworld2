import { state } from '../../store/store';

export const type = "obtenerCentroPantalla";

export default function obtenerCentroPantalla() {
    return {
        type,
        payload: state.player.posicion
    };

}