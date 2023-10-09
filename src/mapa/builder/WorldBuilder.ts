import Chunk from '../Chunk';
import CuevaFactory, { PreferenciasCuevaConPasillos } from '../cueva/CuevaFactory';
import { TamañoCueva } from '../cueva/TamañoCueva';
import DungeonFactory from '../dungeon/DungeonFactory';
import Mapa from '../Mapa';
import { Posicion } from '../Posicion';
import { useStore } from '../../store/store';

export function crearMundoInicial(): void {
	const chunk: Chunk = Mapa.obtenerChunk({ cx: 0, cy: 0, cz: 0 });

	// crearDungeon({ cx: 0, cy: 0, cz: 0, tx: 0, ty: 0 });
	crearCueva({ cx: 0, cy: 0, cz: 0, tx: 0, ty: 0 });

	chunk.obtenerTile({ tx: 12, ty: 12 }).actor = useStore.getState().player;
}

export function crearCueva(positionEntrada: Posicion): void {
	const preferenciasCueva: PreferenciasCuevaConPasillos = {
		tamaño: TamañoCueva.GRANDE,
		posicionInicial: positionEntrada,
		largoMaximo: 15,
		largoMinimo: 5,
		chanceDeRotar: 0.15,
	};
	new CuevaFactory().crearCueva(preferenciasCueva);
}

export function crearDungeon(posicionEntrada: Posicion): void {
	new DungeonFactory({
		posicionEntrada: posicionEntrada,
		preferenciasHabitacion: {
			maximo: 20,
			minimo: 12,
			tamañoMaximo: 10,
			tamañoMinimo: 5,
		},
	}).crearDungeon();
}
