/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars-experimental */

type NivelEducativo = "primaria" | "secundaria"; // Acá estoy creando el alias

class Persona {
    private educacion: NivelEducativo;

    public setEducacion(nuevaEducacion: NivelEducativo): void {
        this.educacion = nuevaEducacion;
    }

    public getEducacion(): NivelEducativo {
        return this.educacion;
    }
}