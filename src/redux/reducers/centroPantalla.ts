import { Posicion } from '../../mapa/Posicion';

const defaultState = { cx: 0, cy: 0, cz: 0, tx: 0, ty: 0 } as Posicion;

export default function reducer(state = defaultState, { type, payload }) {
    switch (type) {
        case "obtenerCentroPantalla":
            return state;
        case "setCentroPantalla":
            state = payload;
        default:
            return state;
    }

}