import RNG from '../src/utils/RNG';

describe("ranmonHasta", () => {
	test("con maximo positivo | devuelve numeros random hasta el maximo", () => {
		const maximo = 5;
		for (let i = 0; i < 100; i++) {
			const rand = RNG.getRandomHasta(maximo);
			expect(rand).toBeLessThan(maximo);
		}
	});
});

describe("randomEntre", () => {
	test("con mínimo menor que el máximo | devuelve números entre mínimo y máximo", () => {
		const min = -2;
		const max = 6;
		for (let i = 0; i < 100; i++) {
			const rand = RNG.getRandomEntre(min, max);
			expect(rand).toBeGreaterThanOrEqual(min);
			expect(rand).toBeLessThan(max);
		}
	});
});

describe("getElementoRandom", () => {
	test("con array con elementos | retorna un elemento de la lista", () => {
		const lista = [1, 2, 3, 4, 5];
		for (let i = 0; i < 100; i++) {
			const rand = RNG.getElementoRandom(lista);
			expect(lista).toContain(rand);
		}
	});

	test("con set con elementos | retorna un elemento de la lista", () => {
		const lista = new Set().add([1, 2, 3, 4, 5]);
		for (let i = 0; i < 100; i++) {
			const rand = RNG.getElementoRandom(lista);
			expect(lista).toContain(rand);
		}
	});

});