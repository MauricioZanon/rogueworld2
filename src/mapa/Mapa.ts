import Tile from './Tile';
import entities from '@/entities/entities';

const tamaño = 33;

export default class Mapa {

    array: Tile[][];

    constructor() {
        this.array = [];
        for (let i = 0; i < tamaño; i++) {
            this.array[i] = [];
            for (let j = 0; j < tamaño; j++) {
                const nuevoTile = new Tile([i, j, 0]);
                nuevoTile.terreno = entities.obtenerEntidad("grass floor");
                if ((i + j) % 7 == 0) {
                    nuevoTile.actor = entities.obtenerEntidad("goblin");
                }
                this.array[i][j] = nuevoTile;
            }
        }
        this.array[16][16].actor = entities.obtenerEntidad("player");
    }

}