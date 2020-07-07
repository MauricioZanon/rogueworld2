import Tile from "./Tile";
import EntidadFactory from "@/entidades/EntidadFactory";
import { Posicion } from "./Posicion";

const TAMAÑO_CHUNK = 25;

export default class Chunk {
	public readonly array: Tile[][];

	public constructor([x0, y0, z0]: Posicion){
		this.array = [];
		for (let i = 0; i < TAMAÑO_CHUNK; i++) {
            this.array[i] = [];
            for (let j = 0; j < TAMAÑO_CHUNK; j++) {
                const nuevoTile = new Tile([x0 + i, y0 + j, z0]);
                nuevoTile.terreno = EntidadFactory.obtenerEntidad("dirt floor");
                if ((i + j) % 7 == 0) {
                    nuevoTile.colocarActor(EntidadFactory.obtenerEntidad("goblin"));
                }
                this.array[i][j] = nuevoTile;
            }
        }
	}
}