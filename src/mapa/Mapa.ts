import { crearChunk } from './builder/ChunkFactory';
import Chunk from "./Chunk";
import { Direccion, NORTE, OESTE, ESTE, SUR } from './Direcciones';
import { toString, aplicarDireccion, ChunkPos, modificarTx, modificarTy, Posicion } from "./Posicion";
import Tile from "./Tile";

export default class Mapa {

    private static readonly mapas = new Map<string, Chunk>();

    public static obtenerChunk(posicion: ChunkPos): Chunk {
        let chunk: Chunk = Mapa.mapas.get(toString(posicion));
        if(!chunk) {
            chunk = crearChunk(posicion);
            Mapa.mapas.set(toString(posicion), chunk);
        }
        return chunk;
    }

    public static obtenerTile(posicion: Posicion, direccion?: Direccion): Tile {
        if(direccion) {
            posicion = aplicarDireccion(posicion, direccion);
        }
        return Mapa.obtenerChunk(posicion).obtenerTile(posicion);
    }

    public static obtenerTilesAdyacentesOrtogonales(posicion: Posicion): Tile[] {
        const resultado: Tile[] = [];
        
        resultado.push(this.obtenerTile(posicion, NORTE));
        resultado.push(this.obtenerTile(posicion, OESTE));
        resultado.push(this.obtenerTile(posicion, ESTE));
        resultado.push(this.obtenerTile(posicion, SUR));
        
        return resultado;
    }

    public static obtenerAreaCuadrada(posicionInicial: Posicion, alto: number, ancho: number): Tile[][] {
        const resultado: Tile[][] = [];
        const auxPos = {...posicionInicial};
        for(let i = 0; i < ancho; i++) {
            resultado[i] = [];
            for(let j = 0; j < alto; j++) {
                resultado[i][j] = Mapa.obtenerTile(auxPos);
                modificarTy(auxPos, 1);
            }
            modificarTx(auxPos, 1);
            auxPos.cy = posicionInicial.cy;
            auxPos.ty = posicionInicial.ty;
        }
        return resultado;
    }

}