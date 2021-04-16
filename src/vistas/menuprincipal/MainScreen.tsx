import React from "react"
import "./styles.css"

export default class MainScreen extends React.Component {

	render() {
		return (
			<div className="menu">
				{/* <button @click="comenzarNuevoJuego" className="boton boton-new-game">New game</button> */}
				<button className="boton boton-load-game">Load game</button>
				{/* <router-link :to="{name: 'CreadorEntidades'}"> */}
					<button className="boton boton-creador-de-entidades">Entity creator</button>
				{/* </router-link> */}
				<button className="boton boton-salir">Exit</button>
			</div>
		);
	}

	public comenzarNuevoJuego(): void {
        // store.commit("usarComoPlayer", EntidadFactory.crearEntidad("player"));
		// crearMundoInicial();
		// void router.push({name: "GameScreen"});
	}

}
