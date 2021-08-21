import React from 'react';
import ConsolaVC from './ConsolaVC';
import { Posicion } from '../../../mapa/Posicion';
import { useStore } from '../../../store/store';
import Entidad from '../../../entidades/Entidad';

export default function SideBarVC() {

	const player: Entidad = useStore(state => state.player);

	function playercurrentHp(): number {
		return player.statsComp.salud.actual;
	}

	function playerMaxHp(): number {
		return player.statsComp.salud.max;
	}

	function playerPos(): string {
		const pos: Posicion = player.posicion;
		return 'cx:' + pos.cx + ' cy:' + pos.cy + ' cz:' + pos.cz + ' tx:' + pos.tx + ' ty:' + pos.ty;
	}

	return (
		<div className="side-bar">
			{ Array.of(playerPos()) }
			<br />
			{ playercurrentHp() } / { playerMaxHp() }
			<br />
			<ConsolaVC></ConsolaVC>
		</div>
	);
}
