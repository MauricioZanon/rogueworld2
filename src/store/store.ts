import create from 'zustand';
import { NombreVista } from '../App';
import Entidad from '../entidades/Entidad';
import { MensajeConsola } from '../vistas/gamescreen/utils/MensajeConsola';
import { PosicionLocal } from '../mapa/Posicion';

type State = {
	player: Entidad,
	usarComoPlayer: (nuevoPlayer: Entidad) => void,
	mensajesConsola: Array<MensajeConsola>,
	agregarMensajeALaConsola: (nuevoMensaje: MensajeConsola) => void,
	vistaActual: NombreVista;

	centroPantalla: PosicionLocal;
	setCentroPantalla: (nuevoCentro: PosicionLocal) => void;
};

export const useStore = create<State>((set) => ({
	player: null as Entidad,
	usarComoPlayer: (nuevoPlayer: Entidad) => set(() => ({ player: nuevoPlayer })),
	mensajesConsola: [],
	agregarMensajeALaConsola: (nuevoMensaje: MensajeConsola) => set((state) => {
		state.mensajesConsola = [nuevoMensaje, ...state.mensajesConsola];
	}),
	vistaActual: 'main screen' as NombreVista,

	centroPantalla: { tx: 0, ty: 0, cx: 0, cy: 0, cz: 0 } as PosicionLocal,
	setCentroPantalla: (nuevoCentro: PosicionLocal) => set(() => ({ centroPantalla: nuevoCentro })),
}));