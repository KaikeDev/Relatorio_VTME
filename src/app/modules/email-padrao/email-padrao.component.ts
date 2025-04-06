import { Component, Input, ViewEncapsulation } from '@angular/core';
import { InterfaceEmailPadrao } from '../../inteface/interface-email-padrao';
import { EmailComponent } from '../emailVtme/email.component';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { TextoService } from '../../service/texto.service';

@Component({
  selector: 'app-email-padrao',
  standalone: true,
  imports: [CommonModule, ],
  templateUrl: './email-padrao.component.html',
  styleUrls:[ './email-padrao.component.scss'],
  encapsulation: ViewEncapsulation.None


})
export class EmailPadraoComponent {

  //@Input() public textoFormatado: InterfaceEmailPadrao[] = []


  textoFormatado: InterfaceEmailPadrao | null =  null;

  constructor(private textoService: TextoService) {}

  ngOnInit() {
    this.textoService.textoFormatado$.subscribe(dados => {
      this.textoFormatado = dados;

    });
  }

   // Função que será chamada ao receber o evento

   /*
   handleTexto(event: InterfaceEmailPadrao) {
     // Adiciona o novo objeto ao array

     if (this.textoFormatado.length > 0) {
      this.textoFormatado.pop();  // Remove o último item da lista
    }

    // Adiciona o novo objeto ao final da lista
    this.textoFormatado.push(event);


   }

   */

   copiar(){
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
