import dayjs from 'dayjs';
import { Tiempo } from "../../../src/utils/tiempo/Tiempo";

describe("Tiempo.ts", () => {

	describe('obtenerHora', () => {

		it('Sin cambiar la hora inicial | devuelve la hora inicial', () => {
			const expectedTime = '06:00:00';
			expect(Tiempo.obtenerHora()).toBe(expectedTime);
		});

	});
	
	describe('avanzar', () => {
	
		it('con valor correcto | llama a dayjs.add con los valores correctos', () => {
			const spyDayJsAdd = jest.spyOn(dayjs.prototype, "add");
			Tiempo.avanzar(1000);
	
			expect(spyDayJsAdd).toHaveBeenCalledWith(1000, 'millisecond');
		});

		it('especificando unidad | llama a dayjs.add con los valores correctos', () => {
			const spyDayJsAdd = jest.spyOn(dayjs.prototype, "add");
			Tiempo.avanzar(5, 'minute');
	
			expect(spyDayJsAdd).toHaveBeenCalledWith(5, 'minute');
		});

		it('con valor correcto | devuelve objeto dayjs', () => {
			const dayJsDevuelto = Tiempo.avanzar(1000);
			expect(dayJsDevuelto).not.toBeNull();
		});
		
		it('con valor correcto | se recalcula la luz natural', () => {
			const luzOriginal = Tiempo.obtenerLuzNatural();

			Tiempo.avanzar(16, "hour");
			const luzNueva = Tiempo.obtenerLuzNatural();
			expect(luzOriginal).not.toEqual(luzNueva);

		});
		
		it('avanzando hasta horario nocturno | se modifica el valor de luz natural', () => {
			Tiempo.avanzar(1, "hour");
	
			expect(Tiempo.obtenerLuzNatural()).toBe(0.1);
		});
	
	});
});
