import create from 'zustand';
import { NombreVista } from '../App';
import Entidad from '../entidades/Entidad';
import { MensajeConsola } from '../vistas/gamescreen/utils/MensajeConsola';
import { Posicion } from '../mapa/Posicion';

type State = {
	player: Entidad,
	usarComoPlayer: (nuevoPlayer: Entidad) => void,
	mensajesConsola: Array<MensajeConsola>,
	agregarMensajeALaConsola: (nuevoMensaje: MensajeConsola) => void,
	vistaActual: NombreVista;

	centroPantalla: Posicion;
	setCentroPantalla: (nuevoCentro: Posicion) => void;
};

export const useStore = create<State>((set) => ({
	player: null as Entidad,
	usarComoPlayer: (nuevoPlayer: Entidad) => set(() => ({ player: nuevoPlayer })),
	mensajesConsola: [],
	agregarMensajeALaConsola: (nuevoMensaje: MensajeConsola) => set((state) => {
		state.mensajesConsola = [nuevoMensaje, ...state.mensajesConsola];
	}),
	vistaActual: 'main screen' as NombreVista,

	centroPantalla: { tx: 0, ty: 0, cx: 0, cy: 0, cz: 0 } as Posicion,
	setCentroPantalla: (nuevoCentro: Posicion) => set(() => ({ centroPantalla: nuevoCentro })),
}));