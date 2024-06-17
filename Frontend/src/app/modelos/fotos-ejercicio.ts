import {Ejercicio} from "./ejercicio";

export class FotosEjercicio {
  id: string;
  foto: string;
  ejercicio: Ejercicio;

  constructor(id: string, foto: string, ejercicio: Ejercicio) {
    this.id = id;
    this.foto = foto;
    this.ejercicio = ejercicio;
  }
}
