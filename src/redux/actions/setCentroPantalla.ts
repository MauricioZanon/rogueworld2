import { Posicion } from '../../mapa/Posicion';
import { CentroPantallaActions } from '../reducers/centroPantalla';

export const type: CentroPantallaActions = "setCentroPantalla";

export default function setCentroPantalla(nuevoCentro: Posicion) {
    return {
        type,
        payload: nuevoCentro
    };

}