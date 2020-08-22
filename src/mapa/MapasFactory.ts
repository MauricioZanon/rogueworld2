import Chunk, {TAMAÑO_CHUNK} from "./Chunk";
import { ChunkPos } from "./Posicion";
import EntidadFactory from "@/entidades/EntidadFactory";
import Tile from "./Tile";
import RNG from "@/utils/RNG";

export default class MapasFactory {

	public static crearChunk(posicion: ChunkPos): Chunk {
		if(posicion.cz > 0) {
			return MapasFactory.crearChunkSubterraneo(posicion);
		} else {
			return MapasFactory.crearChunkExterior(posicion);
		}
	}
	
	private static crearChunkSubterraneo(posicion: ChunkPos): Chunk {
		const tiles: Tile[][] = [];
		for (let i = 0; i < TAMAÑO_CHUNK; i++) {
            tiles[i] = [];
            for (let j = 0; j < TAMAÑO_CHUNK; j++) {
                const nuevoTile = new Tile({...posicion, tx: i, ty: j});
                const rand = RNG.getNoise(posicion.cx*TAMAÑO_CHUNK + nuevoTile.posicion.tx, 
                                            posicion.cy*TAMAÑO_CHUNK + nuevoTile.posicion.ty,
                                            posicion.cz);
                if (rand > 210) {
                    nuevoTile.terreno = EntidadFactory.obtenerEntidad("stone wall");
                } else {
                    nuevoTile.terreno = EntidadFactory.obtenerEntidad("dirt wall");
                }
                tiles[i][j] = nuevoTile;
            }
        }
		return new Chunk(posicion, tiles);
	}

	private static crearChunkExterior(posicion: ChunkPos): Chunk {
		const tiles: Tile[][] = [];
		for (let i = 0; i < TAMAÑO_CHUNK; i++) {
            tiles[i] = [];
            for (let j = 0; j < TAMAÑO_CHUNK; j++) {
                const nuevoTile = new Tile({...posicion, tx: i, ty: j});
                const rand = RNG.getNoise(posicion.cx*TAMAÑO_CHUNK + nuevoTile.posicion.tx, 
                                            posicion.cy*TAMAÑO_CHUNK + nuevoTile.posicion.ty,
                                            posicion.cz);
                if (rand < 75) {
                    nuevoTile.terreno = EntidadFactory.obtenerEntidad("dirt floor");
                } else if (rand > 210) {
                    nuevoTile.terreno = EntidadFactory.obtenerEntidad("stone wall");
                } else {
                    nuevoTile.terreno = EntidadFactory.obtenerEntidad("grass floor");
                }
                tiles[i][j] = nuevoTile;
            }
        }
		return new Chunk(posicion, tiles);
	}

}