import { Routes } from '@angular/router';
import { EmailPadraoComponent } from './modules/email-padrao/email-padrao.component';
import { PlanilhaComponent } from './modules/planilha/planilha.component';
import { HomeComponent } from './modules/home/home.component';
import { EmailComponent } from './modules/emailVtme/email.component';
import { LoginComponent } from './modules/login/login.component';

export const routes: Routes = [

  {path: 'login', component: LoginComponent},
  {path: '', component: HomeComponent},


  {path: 'cadastro', component: EmailComponent},
  {path:'planilha', component: PlanilhaComponent},
];
