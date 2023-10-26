import React from 'react';
import { useStore } from '../../store/store';
import PlayerViewVC from './components/PlayerViewVC';
import SideBarVC from './components/SideBarVC';
import PlayerViewController from './controllers/PlayerViewController';
import './estilosGameScreen.css';
import { crearMundoInicial } from '../../mapa/builder/WorldBuilder';
import EntidadFactory from '../../entidades/EntidadFactory';

export default function GameScreenVC(): JSX.Element {

	// Esto está como parche para que funcione el hot reload
	if(!useStore((state) => state.player)) {
		crearMundoInicial();
		useStore.getState().usarComoPlayer(EntidadFactory.crearEntidad('player'));
	}
 
	window.addEventListener('keypress', PlayerViewController.resolverKeyDown);

	return (
		<>
			<PlayerViewVC />
			<SideBarVC />
		</>
	);

}
