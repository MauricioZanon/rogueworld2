import Tile from '../../mapa/Tile';
import Entidad from '../Entidad';
import { useStore } from '../../store/store';

export default (actor: Entidad, tileOrigen: Tile, tileDestino: Tile): void => {
	if (!tileDestino.terreno.flags.has('INTRANSITABLE')) {
		tileOrigen.actor = null;
		tileDestino.actor = actor;
		useStore.getState().setCentroPantalla(tileDestino.posicion);
	}
};
