import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CountService {

  public contador = new BehaviorSubject<number>(0);
  contador$ = this.contador.asObservable();

  incrementar() {
    this.contador.next(this.contador.value + 1);
  }

  decrementar() {
    this.contador.next(this.contador.value - 1);
  }

  constructor() { }
}
