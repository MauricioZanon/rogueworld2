import EntidadFactory from '../../entidades/EntidadFactory';
import { NombreEntidad } from '../../types/types';
import { PosicionLocal } from '../Posicion';
import Tile from '../Tile';

export default abstract class Excavador {
	public posicion: PosicionLocal;
	public abstract avanzar(): Tile;

	protected excavarTile (tile: Tile): void {
		const nombreTerreno: string = tile.terreno.nombreComp.nombre;
		tile.terreno = EntidadFactory.crearEntidad(<NombreEntidad> nombreTerreno.replace('wall', 'floor'));
	}
}
