import Mapa from '../../mapa/Mapa';
import Entidad from '../Entidad';

export default (entidad: Entidad): void => {
  Mapa.obtenerTile(entidad.posicion).actor = null;
};
