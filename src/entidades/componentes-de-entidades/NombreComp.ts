import Componente from './Componente';

export default class NombreComp implements Componente {
  public constructor (
        public nombre: string
  ) {}
}
