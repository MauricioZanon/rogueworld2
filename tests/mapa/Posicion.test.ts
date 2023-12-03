import { TAMAÑO_CHUNK } from '../../src/mapa/Chunk';
import { PosicionGlobal, PosicionLocal, obtenerGlobal, obtenerLocal } from '../../src/mapa/Posicion';

describe("obtenerGlobal", () => {
	
	test("Con posicion local válida - Devuelve posición global con valores esperados", () => {
		const pos: PosicionLocal = {
			cx: 1,
			cy: 2,
			cz: 0,
			tx: 10,
			ty: 4,
		};
		const posGlobalEsperada: PosicionGlobal = {
			x: 35,
			y: 54,
			z: 0,
		};

		const resultado = obtenerGlobal(pos);

		expect(resultado).toStrictEqual(posGlobalEsperada);
	});

	test("Con posicion local válida con valores negativos - Devuelve posición global con valores esperados", () => {
		const pos: PosicionLocal = {
			cx: -2,
			cy: -1,
			cz: 0,
			tx: 10,
			ty: 15,
		};
		const posGlobalEsperada: PosicionGlobal = {
			x: -40,
			y: -10,
			z: 0,
		};

		const resultado = obtenerGlobal(pos);

		expect(resultado).toStrictEqual(posGlobalEsperada);
	});

});

describe("obtenerLocal", () => {
	test("Con posicion global válida - Devuelve posición local con valores esperados", () => {
		const pos: PosicionGlobal = {
			x: 26,
			y: 15,
			z: 0,
		};

		const posLocalEsperada: PosicionLocal = {
			cx: 1,
			cy: 0,
			cz: 0,
			tx: 1,
			ty: 15,
		};

		const resultado = obtenerLocal(pos);

		expect(resultado).toStrictEqual(posLocalEsperada);

	});

	test("Con posicion global válida con valores negativos - Devuelve posición local con valores esperados", () => {
		const pos: PosicionGlobal = {
			x: -26,
			y: -15,
			z: 0,
		};

		const posLocalEsperada: PosicionLocal = {
			cx: -2,
			cy: -1,
			cz: 0,
			tx: 24,
			ty: 10,
		};

		const resultado = obtenerLocal(pos);

		expect(resultado).toStrictEqual(posLocalEsperada);

	});
});