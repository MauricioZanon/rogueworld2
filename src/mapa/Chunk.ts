import Tile from "./Tile";
import EntidadFactory from "@/entidades/EntidadFactory";
import { ChunkPos, TilePos } from "./Posicion";

export const TAMAÑO_CHUNK = 25;

export default class Chunk {
    public readonly array: Tile[][];
    public readonly posicion: ChunkPos;

	public constructor({cx, cy, cz}: ChunkPos){
        this.posicion = {cx, cy, cz};

		this.array = [];
		for (let i = 0; i < TAMAÑO_CHUNK; i++) {
            this.array[i] = [];
            for (let j = 0; j < TAMAÑO_CHUNK; j++) {
                const nuevoTile = new Tile({...this.posicion, tx: i, ty: j});
                nuevoTile.terreno = EntidadFactory.obtenerEntidad("grass floor");
                if (Math.random() < 0.1) {
                    nuevoTile.terreno = EntidadFactory.obtenerEntidad("dirt floor");
                }
                this.array[i][j] = nuevoTile;
            }
        }
    }

    public obtenerTile(posicion: TilePos): Tile {
        return this.array[posicion.tx][posicion.ty];
    }
    
}