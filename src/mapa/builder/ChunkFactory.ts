import EntidadFactory from "@/entidades/EntidadFactory";
import RNG from "@/utils/RNG";
import Chunk, { TAMAÑO_CHUNK } from "../Chunk";
import { ChunkPos } from "../Posicion";
import Tile from "../Tile";

export function crearChunk(posicion: ChunkPos): Chunk {
    if(posicion.cz > 0) {
        return crearChunkSubterraneo(posicion);
    } else {
        return crearChunkExterior(posicion);
    }
}

function crearChunkSubterraneo(posicion: ChunkPos): Chunk {
    const tiles: Tile[][] = [];
    const posX00 = posicion.cx*TAMAÑO_CHUNK;
    const posY00 = posicion.cy*TAMAÑO_CHUNK;
    for (let i = 0; i < TAMAÑO_CHUNK; i++) {
        tiles[i] = [];
        for (let j = 0; j < TAMAÑO_CHUNK; j++) {
            const nuevoTile = new Tile({...posicion, tx: i, ty: j});
            const rand = RNG.getNoise(posX00 + nuevoTile.posicion.tx, 
                                        posY00 + nuevoTile.posicion.ty,
                                        posicion.cz);
            if (rand > 210) {
                nuevoTile.terreno = EntidadFactory.crearEntidad("stone wall");
            } else {
                nuevoTile.terreno = EntidadFactory.crearEntidad("dirt wall");
            }
            tiles[i][j] = nuevoTile;
        }
    }
    return new Chunk(posicion, tiles);
}

function crearChunkExterior(posicion: ChunkPos): Chunk {
    const tiles: Tile[][] = [];
    for (let i = 0; i < TAMAÑO_CHUNK; i++) {
        tiles[i] = [];
        for (let j = 0; j < TAMAÑO_CHUNK; j++) {
            const nuevoTile = new Tile({...posicion, tx: i, ty: j});
            const rand = RNG.getNoise(posicion.cx*TAMAÑO_CHUNK + nuevoTile.posicion.tx, 
                                        posicion.cy*TAMAÑO_CHUNK + nuevoTile.posicion.ty,
                                        posicion.cz);
            if (rand < 75) {
                nuevoTile.terreno = EntidadFactory.crearEntidad("dirt floor");
            } else if (rand > 210) {
                nuevoTile.terreno = EntidadFactory.crearEntidad("stone wall");
            } else {
                nuevoTile.terreno = EntidadFactory.crearEntidad("grass floor");
            }
            tiles[i][j] = nuevoTile;
        }
    }
    return new Chunk(posicion, tiles);
}