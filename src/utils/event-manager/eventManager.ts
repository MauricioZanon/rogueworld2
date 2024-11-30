import Entidad from "../../entidades/Entidad";

export namespace EventManager {

	let esperandoAccionDelPlayer = false;
	const entidades: Array<Entidad> = [];

	export function agregar(entidad: Entidad): void {
		entidades.push(entidad);
		entidades.sort((a, b) => a.aiComp.proximoTurno - b.aiComp.proximoTurno);
	}

	export function setEsperandoAccionDelPlayer(newEsperandoAccionDelPlayer: boolean): void {
		esperandoAccionDelPlayer = newEsperandoAccionDelPlayer;
	}

	export function avanzar(): void {
		if(esperandoAccionDelPlayer) return;

		const entidad = entidades.shift();
		esperandoAccionDelPlayer = entidad.nombreComp.nombre !== "player";

		if(debeActuar(entidad)) {
			const {estadoActual, estados} = entidad.aiComp;
			estados[estadoActual].actuar(entidad);
		}
	}

	function debeActuar(entidad: Entidad): boolean {
		return entidad &&
				entidad.aiComp.estaActivo &&
				(entidad.nombreComp.nombre !== "player" || entidad.movimientoComp.path?.length > 0);
	}

}