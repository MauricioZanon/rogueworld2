import React from 'react';
import { connect } from 'react-redux';
import Mapa from '../../../mapa/Mapa';
import { Posicion, modificarTx, modificarTy } from '../../../mapa/Posicion';
import Tile from '../../../mapa/Tile';
import TileVC from './TileVC';

type PlayerViewVCProps = { centroPantalla: Posicion; };

type PlayerViewVCState = { cantidadTiles: number; };

class PlayerViewVC extends React.Component<PlayerViewVCProps, PlayerViewVCState> {
  constructor (props) {
    super(props);
    this.state = {
      cantidadTiles: 25
    };
  }

  shouldComponentUpdate (nextProps: PlayerViewVCProps, nextState: PlayerViewVCState): boolean {
    return this.props.centroPantalla !== nextProps.centroPantalla ||
			this.state.cantidadTiles !== nextState.cantidadTiles;
  }

  public render (): JSX.Element {
    return (
      <div className="player-view" onWheelCapture={ () => this.setState({ cantidadTiles: 35 }) }>
        { this.generarTiles() }
      </div >
    );
  }

  // private cambiarZoom(evento: any): void {
  // 	if (evento.deltaY > 0) {
  // 		switch (this.state.cantidadTiles) {
  // 			case 13:
  // 				this.setState({ cantidadTiles: 25 });
  // 				break;
  // 			case 25:
  // 				this.setState({ cantidadTiles: 35 });
  // 				break;
  // 		}
  // 	} else {
  // 		switch (this.state.cantidadTiles) {
  // 			case 35:
  // 				this.setState({ cantidadTiles: 25 });
  // 				break;
  // 			case 25:
  // 				this.setState({ cantidadTiles: 13 });
  // 				break;
  // 		}
  // 	}
  // }

  private generarTiles (): JSX.Element[][] {
    return this.obtenerMapa().map((columna, index) => this.generarColumna(columna, index));
  }

  private generarColumna (columna: Tile[], indexColumna: number): JSX.Element[] {
    return columna.map((tile, indexFila) => {
      return <TileVC tamaño={ this.tamañoTile() } tile={ tile } key={ indexColumna + '-' + indexFila }></TileVC>;
    });
  }

  private obtenerMapa (): Tile[][] {
    return Mapa.obtenerAreaCuadrada(this.pos00(), this.state.cantidadTiles, this.state.cantidadTiles);
  }

  private pos00 (): Posicion {
    const resultado: Posicion = { ...this.props.centroPantalla };
    const delta: number = Math.ceil(-(this.state.cantidadTiles / 2));
    modificarTx(resultado, delta);
    modificarTy(resultado, delta);
    return resultado;
  }

  private tamañoTile (): number {
    return 100 / this.state.cantidadTiles;
  }
}

export default connect((state: { centroPantalla: Posicion; }) => {
  return {
    centroPantalla: state.centroPantalla
  };
})(PlayerViewVC);
