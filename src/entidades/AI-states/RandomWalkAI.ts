import { ESTE, NORESTE, NOROESTE, NORTE, OESTE, SUDESTE, SUDOESTE, SUR } from '../../mapa/Direcciones';
import RNG from '../../utils/RNG/RNG';
import Acciones from '../acciones/Acciones';
import Entidad from '../Entidad';
import AIState from './AIState';

export default class RandomWalkAI implements AIState {

	public exitState(): void {
		throw new Error('Method not implemented.');
	}
	enterState(): void {
		throw new Error('Method not implemented.');
	}

	private readonly direcciones = [
		NOROESTE,
		NORTE,
		NORESTE,
		OESTE,
		ESTE,
		SUDOESTE,
		SUR,
		SUDESTE,
	]

	public actuar(entidad: Entidad): void {
		Acciones.bump(entidad, RNG.getElementoRandom(this.direcciones));
	}
	
}