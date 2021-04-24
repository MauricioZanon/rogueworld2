import React from "react";
import PlayerViewVC from "./components/PlayerViewVC";
import SideBarVC from "./components/SideBarVC";
import "./estilosGameScreen.css";
import PlayerViewController from './controllers/PlayerViewController';

export default class GameScreenVC extends React.Component {

	constructor(props) {
		super(props);
		window.addEventListener("keypress", PlayerViewController.resolverKeyDown);
	}

	public render(): JSX.Element {
		return (
			<div>
				<PlayerViewVC></PlayerViewVC>
				<SideBarVC></SideBarVC>
			</div >
		);
	}

}