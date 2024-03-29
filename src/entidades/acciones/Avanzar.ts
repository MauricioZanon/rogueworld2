import Tile from '../../mapa/Tile';
import Entidad from '../Entidad';
import { useStore } from '../../store/store';
import { Tiempo } from '../../utils/tiempo/Tiempo';

export default (actor: Entidad, tileOrigen: Tile, tileDestino: Tile): void => {
	if (!tileDestino.terreno.flags.has('INTRANSITABLE')) {
		tileOrigen.actor = null;
		tileDestino.actor = actor;
		useStore.getState().setCentroPantalla(tileDestino.posicion);
		Tiempo.avanzar(1000);
	}
};
