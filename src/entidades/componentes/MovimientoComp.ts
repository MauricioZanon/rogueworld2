import Tile from '../../mapa/Tile';
import Componente from './Componente';

type Movimiento = "walk"

export default class MovimientoComp implements Componente {

	public path: Array<Tile> = [];

	public constructor (
        public tipoMovimiento: Movimiento = "walk"
	) {}

}