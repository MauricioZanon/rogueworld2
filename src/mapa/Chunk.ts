import { ChunkPos, TilePos } from './Posicion';
import Tile from './Tile';

export const TAMAÑO_CHUNK = 25;

export default class Chunk {
	private readonly tiles: Tile[][];
	public readonly posicion: ChunkPos;

	public constructor ({ cx, cy, cz }: ChunkPos, tiles: Tile[][]) {
		this.posicion = { cx, cy, cz };
		this.tiles = tiles;
	}

	public obtenerTile (posicion: TilePos): Tile {
		return this.tiles[posicion.tx][posicion.ty];
	}
}
