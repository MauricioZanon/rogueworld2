import EntidadFactory from "@/entidades/EntidadFactory";
import { ChunkPos, TilePos } from "./Posicion";
import Tile from "./Tile";
import RNG from "@/utils/RNG";

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
                const rand = RNG.getNoise(this.posicion.cx*TAMAÑO_CHUNK + nuevoTile.posicion.tx, 
                                            this.posicion.cy*TAMAÑO_CHUNK + nuevoTile.posicion.ty,
                                            this.posicion.cz);
                if (rand < 75) {
                    nuevoTile.terreno = EntidadFactory.obtenerEntidad("dirt floor");
                } else if (rand > 210) {
                    nuevoTile.terreno = EntidadFactory.obtenerEntidad("stone wall");
                } else {
                    nuevoTile.terreno = EntidadFactory.obtenerEntidad("grass floor");
                }
                this.array[i][j] = nuevoTile;
            }
        }
        this.array[0][0].feature = EntidadFactory.obtenerEntidad("upstairs");
        this.array[0][1].feature = EntidadFactory.obtenerEntidad("downstairs");
    }

    public obtenerTile(posicion: TilePos): Tile {
        return this.array[posicion.tx][posicion.ty];
    }
    
}