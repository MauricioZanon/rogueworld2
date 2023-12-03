import Mapa from '../Mapa';
import { PosicionLocal } from '../Posicion';
import Tile from '../Tile';
import EntidadFactory, { NombreEntidad } from '../../entidades/EntidadFactory';
import { Direccion, NORTE, SUR, OESTE, ESTE } from '../Direcciones';
import { TamañoCueva } from './TamañoCueva';
import Excavador from './Excavador';
import ExcavadorPasillos from './ExcavadorPasillos';
import ExcavadorHabitaciones from './ExcavadorHabitaciones';

import RNG from '../../utils/RNG/RNG';

export default class CuevaFactory {
	public crearCueva (preferencias: PreferenciasCuevaConPasillos): void {
		const tilesExcavados: Set<Tile> = new Set<Tile>();
		this.excavarEntrada(preferencias.posicionInicial);
		this.excavarCueva(preferencias, tilesExcavados);
		this.crearActores(tilesExcavados);
	}

	private excavarEntrada (posicionEntrada: PosicionLocal): void {
		let tile: Tile = Mapa.obtenerTile(posicionEntrada);
		tile.feature = EntidadFactory.crearEntidad('downstairs');
		posicionEntrada.cz++;

		tile = Mapa.obtenerTile(posicionEntrada);
		tile.feature = EntidadFactory.crearEntidad('upstairs');
		const nombreTerreno: NombreEntidad = <NombreEntidad> tile.terreno.nombreComp.nombre.replace('wall', 'floor');
		tile.terreno = EntidadFactory.crearEntidad(nombreTerreno);
	}

	private excavarCueva (preferencias: PreferenciasCuevaConPasillos, tilesExcavados: Set<Tile>): void {
		const direccionInicial: Direccion = preferencias.direccionInicial || RNG.getElementoRandom([NORTE, ESTE, SUR, OESTE]);
		const { posicionInicial, tamaño } = preferencias;
		let excavadores: Excavador[] = [new ExcavadorPasillos(posicionInicial, direccionInicial, preferencias)];

		let turnosDesdeUltimoExcavadorNuevo = 0;
		while (tilesExcavados.size < tamaño) {
			excavadores.forEach((excavador) => {
				tilesExcavados.add(excavador.avanzar());
				if (excavador instanceof ExcavadorPasillos) {
					turnosDesdeUltimoExcavadorNuevo++;
					if (turnosDesdeUltimoExcavadorNuevo > 25 && RNG.getRandom() > 0.9) {
						excavadores = [excavador, ...this.crearNuevosExcavadores(excavador.posicion, preferencias)];
						this.crearNuevosExcavadores(excavador.posicion, preferencias);
						turnosDesdeUltimoExcavadorNuevo = 0;
					}
				}
			});
		}
	}

	private crearNuevosExcavadores (posicion: PosicionLocal, preferencias: PreferenciasCuevaConPasillos): Excavador[] {
		return [new ExcavadorHabitaciones(posicion, preferencias),
			new ExcavadorHabitaciones(posicion, preferencias),
			new ExcavadorHabitaciones(posicion, preferencias),
			new ExcavadorHabitaciones(posicion, preferencias),
			new ExcavadorHabitaciones(posicion, preferencias),
			new ExcavadorHabitaciones(posicion, preferencias)];
	}

	private crearActores (tilesExcavados: Set<Tile>): void {
		const tilesArray: Tile[] = Array.from(tilesExcavados);
		for (let i = 0;i < 20;i++) {
			RNG.getElementoRandom(tilesArray).actor = EntidadFactory.crearEntidad('goblin');
		}
	}
}

type PreferenciasCueva = {
    tamaño: TamañoCueva,
    posicionInicial: PosicionLocal;
};

export type PreferenciasCuevaConPasillos = PreferenciasCueva & {
    chanceDeRotar?: 0.05 | 0.1 | 0.15 | 0.2 | 0.25 | 0.3,
    largoMinimo?: number,
    largoMaximo?: number,
    direccionInicial?: Direccion;
};
