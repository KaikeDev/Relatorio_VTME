import { InterfaceEmailPadrao } from '../../inteface/interface-email-padrao';
import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  inject,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-email',
  standalone: true,
  imports: [],
  templateUrl: './email.component.html',
  styleUrl: './email.component.scss',
})
export class EmailComponent {
  #cdr = inject(ChangeDetectorRef);

  @Output() public outputAddtexto = new EventEmitter<InterfaceEmailPadrao>();

  addTexto(value: string) {
    if (value) {


        // Extrai os dados do texto
        const dadosExtraidos = this.extrairDadosDoTexto(value);

        // Emite o evento com os dados extraídos
        this.#cdr.detectChanges();
        this.outputAddtexto.emit(dadosExtraidos);
    }
  }


  extrairDadosDoTexto(texto: string): InterfaceEmailPadrao {
    // Regex para capturar o número do VTME
    const regexVtme = /Nº VTME:\s*(\d+)/;

    // Regex para capturar o nome do consultor
    const regexConsultor = /Consultor\s+([A-Za-z\s\-]+(?:\s+[A-Za-z\s\-]+)*)\s+-\s+[A-Za-z\s\-]+/;

    // Regex para capturar o tipo de cliente
    const regexTipoCliente = /Cliente\s+Novo\s*(\d+)\s*Aditivo\s*(\d+)\s*Portabilidades\s*\d*\s*Renegociação\s*(\d+)/;

    // Regex para capturar o nome do cliente (após a segunda ocorrência de "Cliente")
    const regexNomeCliente = /(?:Cliente\s+){2}([A-Za-z\s\-\.]+(?:\s+[A-Za-z\s\-\.]+)*)\s*(?=CNPJ)/;

    // Regex para capturar o CNPJ
    const regexCnpj = /CNPJ\s+(\d{14})/;

    // Match dos valores no texto
    const vtmeMatch = texto.match(regexVtme);
    const consultorMatch = texto.match(regexConsultor);
    const tipoClienteMatch = texto.match(regexTipoCliente);
    const nomeClienteMatch = texto.match(regexNomeCliente);
    const cnpjMatch = texto.match(regexCnpj);

    // Debugging - Exibindo os resultados de cada captura
    console.log("Vtme Match: ", vtmeMatch);
    console.log("Consultor Match: ", consultorMatch);
    console.log("Tipo Cliente Match: ", tipoClienteMatch);
    console.log("Nome Cliente Match: ", nomeClienteMatch);
    console.log("CNPJ Match: ", cnpjMatch);

    // Determinar o tipo de cliente com base nos números de Novo, Aditivo ou Renegociação
    let tipoCliente = 'Não encontrado';

    if (tipoClienteMatch) {
        const novo = parseInt(tipoClienteMatch[1]);
        const aditivo = parseInt(tipoClienteMatch[2]);
        const renegociacao = parseInt(tipoClienteMatch[3]);

        if (renegociacao > 0) {
            tipoCliente = 'Renegociação';
        } else if (aditivo > 0) {
            tipoCliente = 'Aditivo';
        } else if (novo > 0) {
            tipoCliente = 'Novo';
        }
    }

    // Retornando os dados extraídos
    return {
        vtme: vtmeMatch ? vtmeMatch[1] : 'Não encontrado',
        cliente: nomeClienteMatch ? nomeClienteMatch[1].trim() : 'Não encontrado',  // Nome do cliente
        consultor: consultorMatch ? consultorMatch[1] : 'Não encontrado',  // Nome do consultor
        tipo: tipoCliente,  // Tipo de cliente (Novo, Aditivo ou Renegociação)
        cnpj: cnpjMatch ? cnpjMatch[1] : 'Não encontrado',  // CNPJ
    };

}


}
