import React from 'react';
import ReactDOM from 'react-dom';
import MainScreen from './vistas/menuprincipal/MainScreen';
import GameScreenVC from './vistas/gamescreen/GameScreenVC';
import { HashRouter as Router, Route } from 'react-router-dom';
import './styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { CreadorEntidades } from './vistas/creadorentidades/CreadorEntidades';

const mainElement = document.createElement('div');
mainElement.setAttribute('id', 'root');
document.body.appendChild(mainElement);

export type NombreVista = 'menu principal' | 'game screen' | 'creador de entidades';

export class App extends React.Component {
	render(): JSX.Element {
		return (
			<Router>
				<div>
					<Route path="/creador de entidades" component={ CreadorEntidades } />
					<Route path="/game screen" component={ GameScreenVC } />
					<Route path="/" exact component={ MainScreen } />
				</div>

			</Router>
		);
	}
}

ReactDOM.render(<App></App>, mainElement);
