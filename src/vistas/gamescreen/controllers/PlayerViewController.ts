import Acciones from '../../../entidades/acciones/Acciones';
import Entidad from '../../../entidades/Entidad';
import EntidadFactory from '../../../entidades/EntidadFactory';
import { ESTE, NORESTE, NOROESTE, NORTE, OESTE, SUDESTE, SUDOESTE, SUR } from '../../../mapa/Direcciones';
import Mapa from '../../../mapa/Mapa';
import { store } from '../../../redux/store';
import { state } from '../../../store/store';
import { MensajeConsola } from '../utils/MensajeConsola';

export type EventoMouse = 'mouseup' | 'mousedown';

let accionesHabilitadas = true;

export default class PlayerViewController {

  public static resolverKeyDown(evento: KeyboardEvent): void {
    if (accionesHabilitadas) {

      accionesHabilitadas = false;
      window.setTimeout(() => accionesHabilitadas = true, 32);

      const mensaje: MensajeConsola = new MensajeConsola();
      const player: Entidad = state.player;
      switch (evento.code) {
        case 'Numpad1': {
          Acciones.bump(player, SUDOESTE);
          break;
        }
        case 'Numpad2': {
          Acciones.bump(player, SUR);
          break;
        }
        case 'Numpad3': {
          Acciones.bump(player, SUDESTE);
          break;
        }
        case 'Numpad4': {
          Acciones.bump(player, OESTE);
          break;
        }
        case 'Numpad6': {
          Acciones.bump(player, ESTE);
          break;
        }
        case 'Numpad7': {
          Acciones.bump(player, NOROESTE);
          break;
        }
        case 'Numpad8': {
          Acciones.bump(player, NORTE);
          break;
        }
        case 'Numpad9': {
          Acciones.bump(player, NORESTE);
          break;
        }
        case 'Space':
          Mapa.obtenerTile(player.posicion).terreno = EntidadFactory.crearEntidad('brick floor');
          mensaje.agregar({ texto: 'Mensaje', estilos: { color: 'red', fontWeight: 'bold' } },
            { texto: 'Mensaje', estilos: { color: 'purple', fontWeight: 'bold' } },
            { texto: 'Mensaje', estilos: { color: 'green', fontWeight: 'bold' } },
            { texto: 'Mensaje', estilos: { color: 'yellow', fontWeight: 'bold' } },
            { texto: 'Mensaje', estilos: { color: 'blue', fontWeight: 'bold' } },
            { texto: 'Mensaje' });
          store.dispatch({
            type: 'agregarMensajeConsola',
            payload: mensaje
          });
          break;
        case 'Escape': {
          // cambiarVista("menu principal");
          break;
        }
        case 'IntlBackslash': {
          if (evento.shiftKey) {
            Acciones.descender(player);
          } else {
            Acciones.ascender(player);
          }
          break;
        }
        default: {
          console.log(evento.code);
        }
      }
    }
  }

  public static resolverEventoMouse(nombreEvento: EventoMouse): void {
    switch (nombreEvento) {
      case 'mousedown':
        break;
      case 'mouseup':
        break;
    }
  }
}
