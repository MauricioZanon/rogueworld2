import Tile from "./Tile";
import EntidadFactory from "@/entidades/EntidadFactory";
import { Posicion } from "./Posicion";
import { Direccion } from "./Direcciones";
import Chunk from "./Chunk";
import store from "@/store/store";
import Entidad from "@/entidades/Entidad";

export default class Mapa {

    public static array: Tile[][];

    public static inicializar() {
        const chunk: Chunk = new Chunk([0, 0, 0]);
        Mapa.array = chunk.array;
        const player: Entidad = EntidadFactory.obtenerEntidad("player");
        Mapa.array[16][16].colocarActor(player);
        store.state.player = player;
    }

    public static obtenerTile(posicion: Posicion, direccion?: Direccion): Tile {
        const pos0 = Mapa.array[0][0].posicion;
        let xf: number;
        let yf: number;
        if(direccion) {
            xf = Math.abs(pos0[0] - posicion[0] + direccion.x);
            yf = Math.abs(pos0[1] - posicion[1] + direccion.y);
        } else {
            xf = Math.abs(pos0[0] - posicion[0]);
            yf = Math.abs(pos0[1] - posicion[1]);
        }
        return Mapa.array[xf][yf];
    }

}