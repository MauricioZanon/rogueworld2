import React, { useEffect } from 'react';
import Entidad from '../../../entidades/Entidad';
import { Direcciones } from '../../../mapa/Direcciones';
import Tile from '../../../mapa/Tile';
import { state } from '../../../store/store';
import { CSSProperties } from 'styled-components';

type TileProps = {
  tile: Tile,
  tamaño: number,
};

export default function TileVC(props: TileProps): JSX.Element {

  useEffect(() => { }, [props.tile.simbolo, props.tile.colorSimbolo, props.tile.colorFondo]);

  // shouldComponentUpdate (nextProps: TileProps): boolean {
  //   const tileActual = props.tile;
  //   const tileProximo = nextProps.tile;
  //   return tileActual.simbolo != tileProximo.simbolo ||
  // 		tileActual.colorSimbolo != tileProximo.colorSimbolo ||
  // 		tileActual.colorFondo != tileProximo.colorFondo ||
  // 		props.tamaño != nextProps.tamaño;
  // }

  function generarEstilos(): CSSProperties {
    const tile = props.tile;
    return {
      backgroundColor: tile.colorFondo,
      color: tile.colorSimbolo,
      fontSize: obtenerTamañoFuente(),
      width: obtenerTamañoTile(),
      height: obtenerTamañoTile()
    };
  }

  function obtenerTamañoTile(): string {
    return props.tamaño + 'vh';
  }

  function obtenerTamañoFuente(): string {
    return props.tamaño * 0.8 + 'vh';
  }

  function procesarClick(): void {
    const player: Entidad = state.player;
    console.log(Direcciones.obtenerDireccionDesde(player.posicion, props.tile.posicion));
  }

  return (
    <div className="tile" onClick={ procesarClick } style={ generarEstilos() }>
      <div className="ascii">{ props.tile.simbolo }</div>
    </div>
  );
}
