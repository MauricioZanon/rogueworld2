import { EventManager } from '../../utils/event-manager/eventManager';
import RNG from '../../utils/RNG/RNG';
import { Tiempo } from '../../utils/tiempo/Tiempo';
import Entidad from '../Entidad';

export default (entidad: Entidad): void => {
	const tiempoTranscurrido = RNG.getRandomEntre(900, 1100);
	Tiempo.avanzar(tiempoTranscurrido);
	entidad.aiComp.proximoTurno += tiempoTranscurrido;

	if(entidad.aiComp.estaActivo) {
		EventManager.agregar(entidad);
	}
	EventManager.setEsperandoAccionDelPlayer(entidad.nombreComp.nombre !== "player");
};