import FastSimplexNoise from "@webvoxel/fast-simplex-noise";

export default abstract class RNG {
    private static readonly noiseGen = new FastSimplexNoise({ frequency: 0.01, max: 255, min: 0, octaves: 8 })
    
    public static getRandom(): number {
        return Math.random()
    }

    /**Devuelve un double random entre min y max*/
    public static getRandomEntre(min: number, max: number): number {
        return Math.random() * (max - min) + min;
    }

    public static getNoise(x: number, y:number): number {
        return RNG.noiseGen.scaled([x, y]);
    }

}