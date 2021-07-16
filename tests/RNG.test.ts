import RNG from '../src/utils/RNG';

test("randomHasta | con maximo positivo | devuelve numeros random hasta el maximo", () => {
	const maximo = 5;
	for (let i = 0; i < 100; i++) {
		const rand = RNG.getRandomHasta(maximo);
		expect(rand).toBeLessThan(maximo);
	}
});