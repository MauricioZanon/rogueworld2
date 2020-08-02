import Chunk from "./Chunk";
import { ChunkPos } from "./Posicion";

export default class MapasFactory {

	public static crearChunk(posicion: ChunkPos): Chunk {
		return new Chunk(posicion);
	}

}