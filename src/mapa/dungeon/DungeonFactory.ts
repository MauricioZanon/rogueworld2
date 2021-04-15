import { Posicion, modificarTx, modificarTy } from "../Posicion";
import EntidadFactory from "../../entidades/EntidadFactory";
import Mapa from "@/mapa/Mapa";
import Tile from "../Tile";
import HabitacionDungeon from "./HabitacionDungeon";
import RNG from "../../utils/RNG";
import { Direcciones } from "@/mapa/Direcciones";

export default class DungeonFactory {

    public habitaciones: HabitacionDungeon[] = [];

    public constructor(private readonly preferencias: PreferenciasDungeon) {}

    public crearDungeon(): void {
        this.colocarEscaleras();
        this.crearHabitacionDeEntrada(this.preferencias.posicionEntrada);

        const { minimo, maximo } = this.preferencias.preferenciasHabitacion;
        const cantidadHabitaciones = RNG.getRandomEntre(minimo, maximo);
        while(this.habitaciones.length < cantidadHabitaciones) {
            this.crearHabitacion();
        }
    }

    private colocarEscaleras(): void {
        const posicion = this.preferencias.posicionEntrada;
        const tileEntrada: Tile = Mapa.obtenerTile(posicion);
        tileEntrada.feature = EntidadFactory.crearEntidad("downstairs");
        posicion.cz++;

        const tileSalida: Tile = Mapa.obtenerTile(posicion);
        tileSalida.feature = EntidadFactory.crearEntidad("upstairs");
    }

    // FIXME a veces la escalera de subida queda dentro de una pared
    private crearHabitacionDeEntrada(posicion: Posicion): void {
        const { tamañoMaximo, tamañoMinimo } = this.preferencias.preferenciasHabitacion;
        const ancho = RNG.getRandomEntre(tamañoMinimo, tamañoMaximo);
        const alto = RNG.getRandomEntre(tamañoMinimo, tamañoMaximo);

        modificarTx(posicion, -RNG.getRandomHasta(ancho-2));
        modificarTy(posicion, -RNG.getRandomHasta(alto-2));

        const areaHabitacion: Tile[][] = Mapa.obtenerAreaCuadrada(posicion, ancho, alto);
        
        this.habitaciones.push(new HabitacionDungeon(areaHabitacion));
    }
    
    private crearHabitacion(): void {
        const entrada: Tile = this.encontrarPosibleEntrada();
        const { tamañoMaximo, tamañoMinimo } = this.preferencias.preferenciasHabitacion;
        const ancho = RNG.getRandomEntre(tamañoMinimo, tamañoMaximo);
        const alto = RNG.getRandomEntre(tamañoMinimo, tamañoMaximo);
        const pos00 = this.encontrarPos00DeNuevaHabitacion(entrada, ancho, alto);

        const areaHabitacion: Tile[][] = Mapa.obtenerAreaCuadrada(pos00, ancho, alto);

        if(this.validarAreaParaHabitacion(areaHabitacion)) {
            this.habitaciones.push(new HabitacionDungeon(areaHabitacion));
            entrada.terreno = EntidadFactory.crearEntidad("brick floor");
        }
    }

    private encontrarPosibleEntrada(): Tile {
        let entradaEncontrada: Tile;
        while(!entradaEncontrada) {
            const habitacion: HabitacionDungeon = RNG.getElementoRandom(this.habitaciones);
            const entrada: Tile = RNG.getElementoRandom(habitacion.paredes);
            if(this.entradaAHabitacionValida(entrada)) {
                entradaEncontrada = entrada;
                break;
            }
        }
        return entradaEncontrada;
    }

    private encontrarPos00DeNuevaHabitacion(entrada: Tile, ancho: number, alto: number): Posicion {
        const tileHabitacionAdyacente = Mapa.obtenerTilesAdyacentesOrtogonales(entrada.posicion).find(t => t.terreno.nombreComp.nombre.includes("floor"));
        const direccionDeLaHabitacion = Direcciones.obtenerDireccionDesde(tileHabitacionAdyacente.posicion, entrada.posicion);
        const pos00: Posicion = { ...entrada.posicion }

        if(direccionDeLaHabitacion.x < 0) {
            modificarTx(pos00, -(alto-1));
            modificarTy(pos00, -(RNG.getRandomHasta(ancho-3)+1));
        } else if (direccionDeLaHabitacion.x > 0) {
            const y = -RNG.getRandomEntre(1, ancho-3)
            modificarTy(pos00, y);
        } else if(direccionDeLaHabitacion.y < 0) {
            modificarTy(pos00, -(ancho-1));
            modificarTx(pos00, -(RNG.getRandomHasta(alto-3)+1));
        } else if (direccionDeLaHabitacion.y > 0) {
            const x = -RNG.getRandomEntre(1, alto-3);
            modificarTx(pos00, x);
        }

        return pos00;
    }

    private entradaAHabitacionValida(tile: Tile): boolean {
        const adyacentes: Tile[] = Mapa.obtenerTilesAdyacentesOrtogonales(tile.posicion);
        let cantidadDePisosAdyacentes = 0;
        adyacentes.forEach(tile => {
            if(tile.terreno.nombreComp.nombre.includes("floor")) {
                cantidadDePisosAdyacentes++;
            }
        })

        return cantidadDePisosAdyacentes == 1;
    }

    private validarAreaParaHabitacion(area: Tile[][]): boolean {
        return !area.includes2D(tile => tile.terreno?.nombreComp.nombre.includes("floor"));
    }

}

export type PreferenciasDungeon = {
    posicionEntrada: Posicion,
    preferenciasHabitacion: PreferenciasHabitacionDungeon,
    preferenciasPasillos?: PreferenciasPasillosDungeon
}

type PreferenciasHabitacionDungeon = {
    tamañoMinimo: number,
    tamañoMaximo: number,
    minimo: number,
    maximo: number,
}

type PreferenciasPasillosDungeon = {
    largoMinimo: number,
    largoMaximo: number
}