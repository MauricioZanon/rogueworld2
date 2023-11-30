import React from 'react';
import ConsolaVC from './ConsolaVC';
import { PosicionLocal } from '../../../mapa/Posicion';
import { useStore } from '../../../store/store';
import Entidad from '../../../entidades/Entidad';

export default function SideBarVC(): JSX.Element {

	const player: Entidad = useStore((state) => state.player);
	const centroPantalla: PosicionLocal = useStore((state) => state.centroPantalla);

	function playercurrentHp(): number {
		return player.statsComp.salud.actual;
	}

	function playerMaxHp(): number {
		return player.statsComp.salud.max;
	}

	function posicion(): string {
		const {cx, cy, cz, tx, ty} = centroPantalla;
		return 'CX:' + cx + ' CY:' + cy + ' CZ:' + cz + ' | TX:' + tx + ' TY:' + ty;
	}

	return (
		<div className="side-bar">
			{ posicion() }
			<br />
			{ playercurrentHp() } / { playerMaxHp() }
			<br />
			<ConsolaVC></ConsolaVC>
		</div>
	);
}
