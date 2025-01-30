import { Routes } from '@angular/router';
import { EmailPadraoComponent } from './modules/email-padrao/email-padrao.component';
import { PlanilhaComponent } from './modules/planilha/planilha.component';

export const routes: Routes = [
  {path: '', component: EmailPadraoComponent},
  {path:'planilha', component: PlanilhaComponent}
];
