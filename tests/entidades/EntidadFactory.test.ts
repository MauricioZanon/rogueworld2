import EntidadFactory from '../../src/entidades/EntidadFactory';
import EntidadRepository from '../../src/entidades/EntidadRepository';
import { Flag } from '../../src/types/types';

describe("crearEntidad", () => {

	test("con nombre de entidad existente - devuelve la entidad correspondiente", () => {
		jest.mock("../../src/entidades/EntidadRepository.ts");
		jest.spyOn(window, "require").mockImplementation((a: any) => { return a; });
		EntidadRepository.obtenerEntidades = jest.fn().mockReturnValue([
			{
				"id": 0,
				"tipo": "TERRENO",
				"renderComp": {
					"simbolo": "\"",
					"colorSimbolo": "#44ab60",
					"colorFondo": "#358849ff"
				},
				"nombreComp": {
					"nombre": "grass floor"
				},
				"flags": new Set<Flag>()
			}
		]);

		const entidadCreada = EntidadFactory.crearEntidad("grass floor");

		expect(entidadCreada.nombreComp?.nombre).toBe("grass floor");
	});

});