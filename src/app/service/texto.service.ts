import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { InterfaceEmailPadrao } from '../inteface/interface-email-padrao';

@Injectable({
  providedIn: 'root'
})
export class TextoService {

  constructor() { }

  private textoFormatadoSource = new BehaviorSubject<InterfaceEmailPadrao | null>(null);
  textoFormatado$ = this.textoFormatadoSource.asObservable();

  setTexto(dados: InterfaceEmailPadrao) {
    this.textoFormatadoSource.next(dados);
  }
}
