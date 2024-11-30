import AIState from '../AI-states/AIState';
import { AIStateFactory } from '../AI-states/AIStateFactory';
import Componente from './Componente';

type Estado = "idle" | "combat" | "seaching";

type InfoEstados = {
	[key in Estado]: string
}

export type ColeccionEstados = {
	[key in Estado]: AIState
}

export default class AIComp implements Componente {
	
	public estadoActual: Estado = "idle";
	public estados = {} as ColeccionEstados;
	public estaActivo = true;
	public proximoTurno = 0;

	public constructor (infoEstados: InfoEstados) {
		this.estados.idle = AIStateFactory.getState(infoEstados.idle);
		this.estados.combat = AIStateFactory.getState(infoEstados.combat);
		this.estados.seaching = AIStateFactory.getState(infoEstados.seaching);
	}

}