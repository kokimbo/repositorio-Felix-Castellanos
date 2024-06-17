import {Dificultad} from "./dificultad";
import {User} from "./user";

export class Ejercicio {
  id?: string;
  nombre: string;
  descripcion: string;
  fechaCreacion: Date;
  dificultad: Dificultad;
  user: User;
  fotos?: string[];

  constructor(id: string, nombre: string, descripcion: string, fechaCreacion: Date, dificultad: Dificultad, user: User, fotos: string[]) {
    this.id = id;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.fechaCreacion = fechaCreacion;
    this.dificultad = dificultad;
    this.user = user;
    this.fotos = fotos;
  }
}
