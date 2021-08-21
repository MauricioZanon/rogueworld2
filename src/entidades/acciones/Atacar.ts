import Tile from '../../mapa/Tile';
import { MensajeConsola } from '../../vistas/gamescreen/utils/MensajeConsola';
import Entidad from '../Entidad';
import Acciones from './Acciones';
import { useStore } from '../../store/store';

export default (actor: Entidad, tileObjetivo: Tile): void => {

	const actorObjetivo: Entidad = tileObjetivo.actor;
	const dañoTotal = actor.statsComp.base.STR;
	actorObjetivo.statsComp.salud.actual -= dañoTotal;
	if (actorObjetivo.statsComp.salud.actual <= 0) {
		Acciones.morir(actorObjetivo);
		const mensaje: MensajeConsola = crearMensajeDeMuerte(actor, actorObjetivo);
		useStore.getState().agregarMensajeALaConsola(mensaje);
	}

};

function crearMensajeDeMuerte(atacante: Entidad, objetivo: Entidad): MensajeConsola {
	const mensaje = new MensajeConsola();
	const nombreAtacante = atacante.nombreComp.nombre;
	const nombreObjetivo = objetivo.nombreComp.nombre;
	mensaje.agregar({ texto: nombreAtacante, estilos: { color: 'blue', fontWeight: 'bold' } },
		{ texto: ' ha matado al ', estilos: { color: 'white' } },
		{ texto: nombreObjetivo, estilos: { color: 'red', fontWeight: 'bold' } },
		{ texto: '!', estilos: { color: 'white' } });

	return mensaje;
}
