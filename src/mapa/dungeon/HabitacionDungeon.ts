import EntidadFactory from '../../entidades/EntidadFactory';
import Tile from '../Tile';

export default class HabitacionDungeon {
	public readonly pisos: Set<Tile> = new Set<Tile>();
	public readonly paredes: Set<Tile> = new Set<Tile>();

	public constructor (area: Tile[][]) {
		this.crearPisos(area);
		this.crearParedes(area);
	}

	private crearPisos (area: Tile[][]): void {
		area.flat().forEach((tile) => {
			this.pisos.add(tile);
			tile.terreno = EntidadFactory.crearEntidad('brick floor');
		});
	}

	private crearParedes (area: Tile[][]): void {
		const anchoMax = area.length - 1;
		const altoMax = area[0].length - 1;
	
		for (let i = 1;i < area.length-1;i++) {
			this.crearPared(area[i][0]);
			this.crearPared(area[i][altoMax]);
		}
		for (let i = 0;i < area[0].length;i++) {
			this.crearPared(area[0][i]);
			this.crearPared(area[anchoMax][i]);
		}
	}

	private crearPared(tile: Tile): void {
		this.paredes.add(tile);
		tile.terreno = EntidadFactory.crearEntidad('brick wall');
	}
}
