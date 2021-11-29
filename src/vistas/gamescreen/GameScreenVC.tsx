import React, { useEffect } from 'react';
import PlayerViewVC from './components/PlayerViewVC';
import SideBarVC from './components/SideBarVC';
import PlayerViewController from './controllers/PlayerViewController';
import './estilosGameScreen.css';
import { useStore } from '../../store/store';
import * as PIXI from 'pixi.js';
import { Application, Graphics } from 'pixi.js';
import $ from "jquery";

export default function GameScreenVC(): JSX.Element {

	window.addEventListener('keypress', PlayerViewController.resolverKeyDown);
	const centroPantalla = useStore(state => state.centroPantalla);

	console.count("GAMESCREEN");

	return (
		<>
			<PlayerViewVC centroPantalla={ centroPantalla } />
			<SideBarVC />
		</>
	);

}
