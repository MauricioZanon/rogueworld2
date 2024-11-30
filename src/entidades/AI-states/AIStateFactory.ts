import AIState from './AIState';
import PlayerAI from './PlayerAI';
import RandomWalkAI from './RandomWalkAI';

export namespace AIStateFactory {

	export function getState(nombre: string): AIState {
		switch(nombre) {
			case "playerIdle":
			case "playerCombat":
			case "playerSearching":
				return new PlayerAI();
			case "randomWalk":
				return new RandomWalkAI();
			// case "meleeCombat":
			// 	return new MeleeCombatAI();
			// case "searching":
			// 	return new SearchingAI();
			default:
				console.error(`No se encontró AIState para ${nombre}`);
		}
	}

}