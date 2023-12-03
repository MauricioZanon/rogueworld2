import Tile from '../../mapa/Tile';
import Componente from './Componente';

export class VisionComp implements Componente {

	public tilesVisibles: Tile[] = [];

	public constructor(
		public rango: number
	) { }
}