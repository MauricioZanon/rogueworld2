import { Posicion } from '../../mapa/Posicion';

export type CentroPantallaActions = "obtenerCentroPantalla" | "setCentroPantalla";
type CentroPantallaState = Posicion;
type Action = {
    type: CentroPantallaActions,
    payload?: Posicion;
};

const defaultState: CentroPantallaState = { cx: 0, cy: 0, cz: 0, tx: 12, ty: 12 };

export default function reducer(state = defaultState, { type, payload }: Action): CentroPantallaState {
    switch (type) {
        case "obtenerCentroPantalla":
            return state;
        case "setCentroPantalla":
            state = payload;
        default:
            return state;
    }

}