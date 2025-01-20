import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EmailComponent } from './modules/emailVtme/email.component';
import { EmailPadraoComponent } from './modules/email-padrao/email-padrao.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, EmailPadraoComponent],
 template:`
 <router-outlet />


 <app-email-padrao/>

 `
})
export class AppComponent {
  title = 'maxtel';
}
