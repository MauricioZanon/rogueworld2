import Mapa from '../../mapa/Mapa';
import { Posicion } from '../../mapa/Posicion';
import Tile from '../../mapa/Tile';
import Entidad from '../Entidad';

export default (actor: Entidad): void => {
	const origen: Tile = Mapa.obtenerTile(actor.posicion);
	const destino: Tile = obtenerTileInferior(origen);
	if (origen.feature?.nombreComp.nombre === 'downstairs') {
		origen.actor = null;
		destino.actor = actor;
	}
};

function obtenerTileInferior (origen: Tile): Tile {
	const posicionDestino: Posicion = { ...origen.posicion };
	posicionDestino.cz++;
	return Mapa.obtenerTile(posicionDestino);
}
