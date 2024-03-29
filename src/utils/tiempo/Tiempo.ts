import dayjs, { Dayjs, OpUnitType } from 'dayjs';

export abstract class Tiempo {

	private static horaActual = dayjs().set("hour", 6).set("minute", 0).set("second", 0);
	private static luzNatural = 1;

	public static obtenerHora(): string {
		return Tiempo.horaActual.format("HH:mm:ss");
	}

	public static avanzar(valor: number, unidad: OpUnitType = "millisecond"): Dayjs {
		Tiempo.horaActual = Tiempo.horaActual.add(valor, unidad);
		this.recalcularLuzNatural();
		return Tiempo.horaActual;
	}
	
	private static recalcularLuzNatural(): void {
		const minutos = Tiempo.horaActual.minute() + (Tiempo.horaActual.hour() * 60);
		if(minutos >= 300 && minutos < 480) {
			Tiempo.luzNatural = 0.00635199 * Math.pow(1.01059529, minutos);
		}else if(minutos >= 1080 && minutos < 1260) {
			Tiempo.luzNatural = 2.14833262E+37 * Math.pow(minutos, -12.30691935);
		}else if(minutos >= 1260 || minutos < 300) {
			Tiempo.luzNatural = 0.1;
		}else {
			Tiempo.luzNatural = 1;
		}
	}

	public static obtenerLuzNatural(): number {
		return Tiempo.luzNatural;
	}

}
