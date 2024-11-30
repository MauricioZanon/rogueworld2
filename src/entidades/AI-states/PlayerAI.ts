import { Direcciones } from '../../mapa/Direcciones';
import Acciones from '../acciones/Acciones';
import Entidad from '../Entidad';
import AIState from './AIState';

export default class PlayerAI implements AIState {

	public exitState(): void {
		throw new Error('Method not implemented.');
	}
	enterState(): void {
		throw new Error('Method not implemented.');
	}

	public actuar(entidad: Entidad): void {
		const path = entidad.movimientoComp.path;
		if(path.length) {
			const direccion = Direcciones.obtenerDireccionDesde(entidad.posicion, path.shift().posicion);
			Acciones.bump(entidad, direccion);
		}
	}
	
}