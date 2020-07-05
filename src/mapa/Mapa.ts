import Tile from "./Tile";
import EntidadFactory from "@/entidades/EntidadFactory";

const TAMAÑO_CHUNK = 25;

export default class Mapa {

    public readonly array: Tile[][];

    public constructor() {
        this.array = [];
        for (let i = 0; i < TAMAÑO_CHUNK; i++) {
            this.array[i] = [];
            for (let j = 0; j < TAMAÑO_CHUNK; j++) {
                const nuevoTile = new Tile([i, j, 0]);
                nuevoTile.terreno = EntidadFactory.obtenerEntidad("dirt floor");
                if ((i + j) % 7 == 0) {
                    nuevoTile.actor = EntidadFactory.obtenerEntidad("goblin");
                }
                this.array[i][j] = nuevoTile;
            }
        }
        this.array[16][16].actor = EntidadFactory.obtenerEntidad("player");
    }

}