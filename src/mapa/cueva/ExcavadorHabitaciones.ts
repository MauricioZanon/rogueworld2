import RNG from "@/utils/RNG";
import Mapa from "../Mapa";
import { Posicion } from "../Posicion";
import Tile from "../Tile";
import { PreferenciasCuevaConPasillos } from "./CuevaFactory";
import Excavador from "./Excavador";

export default class ExcavadorHabitaciones extends Excavador {
    private readonly preferencias: PreferenciasCuevaConPasillos;

    public constructor(posicionInicial: Posicion, preferencias: PreferenciasCuevaConPasillos){
        super();
        this.posicion = posicionInicial;
        this.preferencias = preferencias;
    }

    public avanzar(): Tile {
        const tiles: Tile[] = Mapa.obtenerTilesAdyacentesOrtogonales(this.posicion);
        const tilesExcavables: Tile[] = tiles.filter(tile => tile.terreno.flags.has("INTRANSITABLE"));
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
    
}