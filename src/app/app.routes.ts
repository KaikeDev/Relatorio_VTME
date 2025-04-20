import { Routes } from '@angular/router';
import { EmailPadraoComponent } from './modules/email-padrao/email-padrao.component';
import { PlanilhaComponent } from './modules/planilha/planilha.component';
import { HomeComponent } from './modules/home/home.component';
import { EmailComponent } from './modules/emailVtme/email.component';
import { LoginComponent } from './modules/login/login.component';
import { NavComponent } from './modules/nav/nav.component';
import { authGuardGuard } from './guard/auth-guard.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },

  { path: '', redirectTo: 'login', pathMatch: 'full' },

  {
    path: 'nav',
    component: NavComponent, // <<< Nav é o container principal
    canActivate: [authGuardGuard], // <<< proteger a área privada
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' }, // redireciona para home
      { path: 'home', component: HomeComponent },
      { path: 'cadastro', component: EmailComponent },
      { path: 'planilha', component: PlanilhaComponent },
      // (aqui pode adicionar mais rotas depois se quiser)
    ]
  },

  { path: '**', redirectTo: 'login' }, // se a rota não existir, vai para login
];
