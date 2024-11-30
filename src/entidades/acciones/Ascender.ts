import Mapa from '../../mapa/Mapa';
import { PosicionLocal } from '../../mapa/Posicion';
import Tile from '../../mapa/Tile';
import { useStore } from '../../store/store';
import Entidad from '../Entidad';
import Acciones from './Acciones';

export default (actor: Entidad): void => {
	const origen: Tile = Mapa.obtenerTile(actor.posicion);
	const destino: Tile = obtenerTileSuperior(origen);
	if (origen.feature?.nombreComp.nombre === 'upstairs') {
		origen.actor = null;
		destino.actor = actor;
		useStore.getState().setCentroPantalla(destino.posicion);
		Acciones.terminarTurno(actor);
	}
};

function obtenerTileSuperior (origen: Tile): Tile {
	const posicionDestino: PosicionLocal = { ...origen.posicion };
	posicionDestino.cz--;
	return Mapa.obtenerTile(posicionDestino);
}
