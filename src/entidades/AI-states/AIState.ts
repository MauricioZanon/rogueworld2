import Entidad from '../Entidad';

export default interface AIState {

	actuar(entidad: Entidad);
	exitState();
	enterState();
	
}