import RNG from "@/utils/RNG";
import Mapa from "../Mapa";
import { Posicion } from "../Posicion";
import Tile from "../Tile";
import EntidadFactory from "../../entidades/EntidadFactory";

export default class CuevaFactory {

    public crearCueva(posicion: Posicion, tamaño: TamañoCueva): void {

        const excavadores: Excavador[] = [new Excavador(posicion)];
        const tilesExcavados: Set<Tile> = new Set<Tile>();

        this.excavarEntrada(Mapa.obtenerTile(posicion));
        while(tilesExcavados.size < tamaño) {
            console.log(excavadores.length);
            excavadores.forEach(excavador => {
                tilesExcavados.add(excavador.avanzar());
                if(RNG.getRandom() > 0.95) {
                    excavadores.push(new Excavador(excavador.posicion));
                }
            });
        }
    }

    private excavarEntrada(tile: Tile): void {
        const nombreTerreno = tile.terreno.nombreComp.nombre;
        tile.terreno = EntidadFactory.crearEntidad(nombreTerreno.replace("wall", "floor"));
    }

}

export enum TamañoCueva {
    CHICA = 100,
    MEDIANA = 200,
    GRANDE = 350
}

class Excavador {

    public constructor(public posicion: Posicion){}

    public avanzar(): Tile | null {
        const tiles: Tile[] = Mapa.obtenerTilesAdyacentesOrtogonales(this.posicion);
        const tilesExcavables: Tile[] = tiles.filter(tile => tile.terreno.esIntransitable);
        let tileSiguiente: Tile;
        if(tilesExcavables.length) {
            tileSiguiente = RNG.getElementoRandom(tilesExcavables);
            this.excavarTile(tileSiguiente);
        } else {
            tileSiguiente = RNG.getElementoRandom(tiles);
        }
        this.posicion = tileSiguiente.posicion;
        return tileSiguiente;
    }

    private excavarTile(tile: Tile): void {
        const nombreTerreno: string = tile.terreno.nombreComp.nombre;
        tile.terreno = EntidadFactory.crearEntidad(nombreTerreno.replace("wall", "floor"));
    }

}