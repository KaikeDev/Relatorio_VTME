import { Component, Input } from '@angular/core';
import { InterfaceEmailPadrao } from '../../inteface/interface-email-padrao';
import { EmailComponent } from '../emailVtme/email.component';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-email-padrao',
  standalone: true,
  imports: [EmailComponent, CommonModule, HeaderComponent],
  templateUrl: './email-padrao.component.html',
  styleUrl: './email-padrao.component.scss'
})
export class EmailPadraoComponent {

  @Input() public textoFormatado: InterfaceEmailPadrao[] = []


   // Função que será chamada ao receber o evento
   handleTexto(event: InterfaceEmailPadrao) {
     // Adiciona o novo objeto ao array

     if (this.textoFormatado.length > 0) {
      this.textoFormatado.pop();  // Remove o último item da lista
    }

    // Adiciona o novo objeto ao final da lista
    this.textoFormatado.push(event);


   }

   copiar(){
    const paragrafos = document.querySelectorAll('p'); // Seleciona todos os elementos <p>

    // Cria um intervalo de seleção para cada parágrafo
    paragrafos.forEach(paragrafo => {
        const range = document.createRange();
        range.selectNodeContents(paragrafo);

        const selection = window.getSelection();
        if (selection) {
            selection.removeAllRanges();
            selection.addRange(range);
            document.execCommand('copy');
        }
    })
   }


}
