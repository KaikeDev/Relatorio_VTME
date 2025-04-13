import { Component, Input, ViewEncapsulation } from '@angular/core';
import { InterfaceEmailPadrao } from '../../inteface/interface-email-padrao';
import { EmailComponent } from '../emailVtme/email.component';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { TextoService } from '../../service/texto.service';

@Component({
  selector: 'app-email-padrao',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './email-padrao.component.html',
  styleUrls: ['./email-padrao.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class EmailPadraoComponent {
  textoFormatado: InterfaceEmailPadrao | null = null;

  constructor(private textoService: TextoService) {}

  ngOnInit() {
    this.textoService.textoFormatado$.subscribe((dados) => {
      this.textoFormatado = dados;
    });
  }

  copiar() {
    const elemento = document.getElementById('p-email-padrao');

    if (elemento) {
      const range = document.createRange();
      range.selectNodeContents(elemento);

      const selection = window.getSelection();
      selection?.removeAllRanges();
      selection?.addRange(range);

      document.execCommand('copy');

      selection?.removeAllRanges(); // opcional: limpa a seleção após copiar
    }
  }
}
