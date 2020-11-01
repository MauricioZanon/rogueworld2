import FastSimplexNoise from "@webvoxel/fast-simplex-noise";

export default abstract class RNG {
    private static readonly noiseGen = new FastSimplexNoise({ frequency: 0.01, max: 255, min: 0, octaves: 8 })
    
    public static getRandom(): number {
        return Math.random()
    }

    public static getRandomHasta(maximo: number): number {
        return Math.random()*maximo;
    }

    public static getElementoRandom<T>(lista: T[]): T{
        return lista[Math.floor(RNG.getRandomHasta(lista.length))];
    }

    public static getNoise(x: number, y: number, z: number): number {
        return RNG.noiseGen.scaled([x, y, z]);
    }

}