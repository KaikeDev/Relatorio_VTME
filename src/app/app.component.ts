import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EmailComponent } from './modules/emailVtme/email.component';
import { EmailPadraoComponent } from './modules/email-padrao/email-padrao.component';
import { HeaderComponent } from "./modules/header/header.component";
import { FooterComponent } from "./modules/footer/footer.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FooterComponent],
 template:`

 <router-outlet />

 <app-footer/>


 `
})
export class AppComponent {
  title = 'maxtel';
}
