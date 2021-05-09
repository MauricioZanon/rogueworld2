import { crearChunk } from './builder/ChunkFactory';
import Chunk from './Chunk';
import { Direccion, NORTE, OESTE, ESTE, SUR, NOROESTE, NORESTE, SUDESTE, SUDOESTE } from './Direcciones';
import { toString, aplicarDireccion, ChunkPos, modificarTx, modificarTy, Posicion } from './Posicion';
import Tile from './Tile';

export default class Mapa {
    private static readonly mapas = new Map<string, Chunk>();

    public static obtenerChunk (posicion: ChunkPos): Chunk {
      let chunk: Chunk = this.mapas.get(toString(posicion));
      if (!chunk) {
        chunk = crearChunk(posicion);
        this.mapas.set(toString(posicion), chunk);
      }
      return chunk;
    }

    public static obtenerTile (posicion: Posicion, direccion?: Direccion): Tile {
      if (direccion) {
        posicion = aplicarDireccion(posicion, direccion);
      }
      return this.obtenerChunk(posicion).obtenerTile(posicion);
    }

    public static obtenerTilesAdyacentesOrtogonales (posicion: Posicion): Tile[] {
      return [
        this.obtenerTile(posicion, NORTE),
        this.obtenerTile(posicion, OESTE),
        this.obtenerTile(posicion, ESTE),
        this.obtenerTile(posicion, SUR)
      ];
    }

    public static obtenerTilesAdyacentesDiagonales (posicion: Posicion): Tile[] {
      return [
        this.obtenerTile(posicion, NOROESTE),
        this.obtenerTile(posicion, SUDOESTE),
        this.obtenerTile(posicion, NORESTE),
        this.obtenerTile(posicion, SUDESTE)
      ];
    }

    public static obtenerTilesAdyacentes (posicion: Posicion): Tile[] {
      return [
        ...this.obtenerTilesAdyacentesOrtogonales(posicion),
        ...this.obtenerTilesAdyacentesDiagonales(posicion)
      ];
    }

    // TODO refactor
    public static obtenerAreaCuadrada (posicionInicial: Posicion, alto: number, ancho: number): Tile[][] {
      const resultado: Tile[][] = [];
      const auxPos = { ...posicionInicial };
      for (let i = 0; i < ancho; i++) {
        resultado[i] = [];
        for (let j = 0; j < alto; j++) {
          resultado[i][j] = this.obtenerTile(auxPos);
          modificarTy(auxPos, 1);
        }
        modificarTx(auxPos, 1);
        auxPos.cy = posicionInicial.cy;
        auxPos.ty = posicionInicial.ty;
      }
      return resultado;
    }
}
