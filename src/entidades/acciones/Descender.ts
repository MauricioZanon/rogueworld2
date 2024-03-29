import Mapa from '../../mapa/Mapa';
import { PosicionLocal } from '../../mapa/Posicion';
import Tile from '../../mapa/Tile';
import { useStore } from '../../store/store';
import { Tiempo } from '../../utils/tiempo/Tiempo';
import Entidad from '../Entidad';

export default (actor: Entidad): void => {
	const origen: Tile = Mapa.obtenerTile(actor.posicion);
	const destino: Tile = obtenerTileInferior(origen);
	if (origen.feature?.nombreComp.nombre === 'downstairs') {
		origen.actor = null;
		destino.actor = actor;
		useStore.getState().setCentroPantalla(destino.posicion);
		Tiempo.avanzar(1000);
	}
};

function obtenerTileInferior (origen: Tile): Tile {
	const posicionDestino: PosicionLocal = { ...origen.posicion };
	posicionDestino.cz++;
	return Mapa.obtenerTile(posicionDestino);
}
