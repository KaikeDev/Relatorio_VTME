import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor() { }
  loggedIn = false;

  login(username: string, senha: string): boolean {
    if (username === 'kaikevt' && senha === '123') {
      console.log('Usuário autenticado com sucesso!');
      this.loggedIn = true;
      localStorage.setItem('loggedIn', 'true'); // <<< salva no navegador
      return true;
    } else {
      console.log('Usuário ou senha inválidos.');
      this.loggedIn = false;
      localStorage.setItem('loggedIn', 'false'); // <<< salva no navegador
      return false;
    }
  }

  isAuthenticated(): boolean {
    const storedLoggedIn = localStorage.getItem('loggedIn');
    this.loggedIn = storedLoggedIn === 'true'; // <<< atualiza baseado no que salvou
    return this.loggedIn;
  }

  logout() {
    this.loggedIn = false;
    localStorage.setItem('loggedIn', 'false');
  }
}
