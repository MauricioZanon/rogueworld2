import store from "@/store/store";
import Chunk from "./Chunk";
import { Direccion } from "./Direcciones";
import { toString, aplicarDireccion, ChunkPos, modificarTx, modificarTy, Posicion } from "./Posicion";
import Tile from "./Tile";
import MapasFactory from "./MapasFactory";

export default class Mapa {

    private static readonly mapas = new Map<string, Chunk>();

    public static inicializar(): void {
        const chunk: Chunk = new Chunk({cx: 0, cy: 0, cz: 0});
        Mapa.mapas.set(toString(chunk.posicion), chunk);
        chunk.array[12][12].colocarActor(store.getters.player);
    }

    public static obtenerChunk(posicion: ChunkPos): Chunk {
        let chunk: Chunk = Mapa.mapas.get(toString(posicion));
        if(!chunk) {
            chunk = MapasFactory.crearChunk(posicion);
            Mapa.mapas.set(toString(posicion), chunk);
        }
        return chunk;
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
                resultado[i][j] = Mapa.obtenerTile(auxPos);
                modificarTy(auxPos, 1);
            }
            modificarTx(auxPos, 1);
            modificarTy(auxPos, -alto);
        }
        return resultado;
    }

}