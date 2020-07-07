import Chunk from "./Chunk";
import { Posicion } from "./Posicion";

export default class MapasFactory {

	private constructor() {
		console.log("asd");
		
	}

	public static crearChunk(posicion: Posicion): Chunk {
		return new Chunk(posicion);
	}

}