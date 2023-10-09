import React from 'react';
import { useStore } from '../../store/store';
import PlayerViewVC from './components/PlayerViewVC';
import SideBarVC from './components/SideBarVC';
import PlayerViewController from './controllers/PlayerViewController';
import './estilosGameScreen.css';

export default function GameScreenVC(): JSX.Element {

	window.addEventListener('keypress', PlayerViewController.resolverKeyDown);
	const centroPantalla = useStore((state) => state.centroPantalla);

	console.count("GAMESCREEN");

	return (
		<>
			<PlayerViewVC centroPantalla={ centroPantalla } />
			<SideBarVC />
		</>
	);

}
