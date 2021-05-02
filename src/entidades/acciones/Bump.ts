import { Direccion } from '../../mapa/Direcciones'
import Mapa from '../../mapa/Mapa'
import Tile from '../../mapa/Tile'
import Entidad from '../Entidad'
import Acciones from './Acciones'

export default (actor: Entidad, direccion: Direccion): void => {
  const tileOrigen: Tile = Mapa.obtenerTile(actor.posicion)
  const tileDestino: Tile = Mapa.obtenerTile(actor.posicion, direccion)
  if (tileDestino.actor) {
    Acciones.atacar(actor, tileDestino)
  } else {
    Acciones.avanzar(actor, tileOrigen, tileDestino)
  }
}
