import React from 'react'
import Entidad from '../../../entidades/Entidad'
import { Direcciones } from '../../../mapa/Direcciones'
import Tile from '../../../mapa/Tile'
import { state } from '../../../store/store'
import { CSSProperties } from 'styled-components'

type TileProps = {
	tile: Tile,
	tamaño: number,
};

export default class TileVC extends React.Component<TileProps> {
  public render (): JSX.Element {
    return (
      <div className="tile" onClick={ this.procesarClick } style={ this.generarEstilos() }>
        <div className="ascii">{ this.props.tile.simbolo }</div>
      </div>
    )
  }

  shouldComponentUpdate (nextProps: TileProps): boolean {
    const tileActual = this.props.tile
    const tileProximo = nextProps.tile
    return tileActual.simbolo != tileProximo.simbolo ||
			tileActual.colorSimbolo != tileProximo.colorSimbolo ||
			tileActual.colorFondo != tileProximo.colorFondo ||
			this.props.tamaño != nextProps.tamaño
  }

  private generarEstilos (): CSSProperties {
    const tile = this.props.tile
    return {
      backgroundColor: tile.colorFondo,
      color: tile.colorSimbolo,
      fontSize: this.obtenerTamañoFuente(),
      width: this.obtenerTamañoTile(),
      height: this.obtenerTamañoTile()
    }
  };

  private obtenerTamañoTile (): string {
    return this.props.tamaño + 'vh'
  }

  private obtenerTamañoFuente (): string {
    return this.props.tamaño * 0.8 + 'vh'
  }

  private procesarClick (): void {
    const player: Entidad = state.player
    console.log(Direcciones.obtenerDireccionDesde(player.posicion, this.props.tile.posicion))
  }
}
