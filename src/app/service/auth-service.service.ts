import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor() { }

  authenticated(username: string, senha:string): boolean{

    if(username === 'kaikevt' && senha === '123'){
      console.log('Usuário autenticado com sucesso!');
      return true
    } else {
      console.log('Usuário ou senha inválidos.')
      return false
    }
  }
}
