import Tile from '../../mapa/Tile';
import { useStore } from '../../store/store';
import Entidad from '../Entidad';
import Acciones from './Acciones';

export default (actor: Entidad, tileOrigen: Tile, tileDestino: Tile): void => {
	if (!tileDestino.terreno.flags.has('INTRANSITABLE')) {
		tileOrigen.actor = null;
		tileDestino.actor = actor;
		useStore.getState().setCentroPantalla(tileDestino.posicion);
		Acciones.terminarTurno(actor);
	}
};
