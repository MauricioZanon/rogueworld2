import store from "@/store/store";
import Chunk from "./Chunk";
import { Direccion } from "./Direcciones";
import { aplicarDireccion, ChunkPos, modificarTx, modificarTy, Posicion } from "./Posicion";
import Tile from "./Tile";

export default class Mapa {

    private static readonly mapas = new Map<string, Chunk>();

    public static inicializar(): void {
        const chunk: Chunk = new Chunk({cx: 0, cy: 0, cz: 0});
        Mapa.mapas.set(chunk.posicion.toString(), chunk);
        chunk.array[12][12].colocarActor(store.getters.player);
    }

    public static obtenerChunk(posicion: ChunkPos): Chunk {
        return Mapa.mapas.get(posicion.toString());
    }

    public static obtenerTile(posicion: Posicion, direccion?: Direccion): Tile {
        if(direccion) {
            posicion = aplicarDireccion(posicion, direccion);
        }
        return Mapa.obtenerChunk(posicion).obtenerTile(posicion);
    }

    public static obtenerAreaCuadrada(posicionInicial: Posicion, alto: number, ancho: number): Tile[][] {
        const resultado: Tile[][] = [];
        const auxPos = {...posicionInicial};
        for(let i = 0; i < ancho; i++) {
            resultado[i] = [];
            for(let j = 0; j < alto; j++) {
                modificarTy(auxPos, 1);
                resultado[i][j] = Mapa.obtenerTile(auxPos);
            }
            modificarTx(auxPos, 1);
        }

        return resultado;
    }

}