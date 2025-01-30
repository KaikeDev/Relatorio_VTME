import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EmailComponent } from './modules/emailVtme/email.component';
import { EmailPadraoComponent } from './modules/email-padrao/email-padrao.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
 template:`
 <router-outlet />



 `
})
export class AppComponent {
  title = 'maxtel';
}
