export default class RNG {
    private constructor() {}

    public static getRandom(): number{
        return Math.random()
    }

    /**Devuelve un double random entre min y max*/
    public static getRandomEntre(min: number, max: number): number {
        return (Math.random() * (max - min)) + min;
    }

}