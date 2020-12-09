import store from "@/store/store";
import Chunk from "./Chunk";
import { Direccion, NORTE, OESTE, ESTE, SUR } from './Direcciones';
import { toString, aplicarDireccion, ChunkPos, modificarTx, modificarTy, Posicion } from "./Posicion";
import Tile from "./Tile";
import MapasFactory from "./MapasFactory";
import CuevaFactory from "./cueva/CuevaFactory";
import { TamañoCueva } from './cueva/TamañoCueva';
import { PreferenciasCuevaConPasillos } from './cueva/CuevaFactory';

export default class Mapa {

    private static readonly mapas = new Map<string, Chunk>();

    public static inicializar(): void {
        const chunk: Chunk = MapasFactory.crearChunk({cx: 0, cy: 0, cz: 0});
        Mapa.mapas.set(toString(chunk.posicion), chunk);

        const preferenciasCueva: PreferenciasCuevaConPasillos = {
            tamaño: TamañoCueva.GRANDE,
            posicionInicial: {cx:0, cy:0, cz:1, tx:0, ty:0},
            largoMaximo: 15,
            largoMinimo: 5,
            chanceDeRotar: 0.15
        }

        new CuevaFactory().crearCuevaConPasillos(preferenciasCueva);
        chunk.obtenerTile({tx: 12, ty: 12}).colocarActor(store.getters.player);
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

    public static obtenerTilesAdyacentesOrtogonales(posicion: Posicion): Tile[] {
        const resultado: Tile[] = [];
        
        resultado.push(this.obtenerTile(posicion, NORTE));
        resultado.push(this.obtenerTile(posicion, OESTE));
        resultado.push(this.obtenerTile(posicion, ESTE));
        resultado.push(this.obtenerTile(posicion, SUR));
        
        return resultado;
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
            auxPos.cy = posicionInicial.cy;
            auxPos.ty = posicionInicial.ty;
        }
        return resultado;
    }

}