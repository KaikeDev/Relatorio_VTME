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

  public listVTME: Array<InterfaceEmailPadrao> =JSON.parse(localStorage.getItem('dadosCliente') || "[]");


  addTexto(value: string) {
    if (value) {


        // Extrai os dados do texto
        const dadosExtraidos = this.extrairDadosDoTexto(value);

        this.adicionarNoLocalStorage(dadosExtraidos)

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
    const regexNomeCliente = /(?:Cliente\s+){2}([A-Za-z0-9\s\-\.]+(?:\s+[A-Za-z0-9\s\-\.]+)*)\s*(?=CNPJ)/;

    // Regex para capturar o CNPJ
    const regexCnpj = /CNPJ\s+(\d{14})/;

    // Regex para capturar o "Valor Pedido"
    const regexValorPedido = /Valor Pedido\s*R\$\s*([\d\.,]+)\s*Serviços Adicionais/;

    // Regex para capturar a quantidade após os tipos de cliente
    const regexQuantidade = /Novo\s*(\d+)[\s\S]*Aditivo\s*(\d+)[\s\S]*Portabilidades\s*(\d*)[\s\S]*Renegociação\s*(\d+)/;


    // Match dos valores no texto
    const vtmeMatch = texto.match(regexVtme);
    const consultorMatch = texto.match(regexConsultor);
    const tipoClienteMatch = texto.match(regexTipoCliente);
    const nomeClienteMatch = texto.match(regexNomeCliente);
    const cnpjMatch = texto.match(regexCnpj);
    const valorPedidoMatch = texto.match(regexValorPedido);
    const quantidadeMatch = texto.match(regexQuantidade);

    // Debugging - Exibindo os resultados de cada captura
    console.log("Vtme Match: ", vtmeMatch);
    console.log("Consultor Match: ", consultorMatch);
    console.log("Tipo Cliente Match: ", tipoClienteMatch);
    console.log("Nome Cliente Match: ", nomeClienteMatch);
    console.log("CNPJ Match: ", cnpjMatch);
    console.log("Valor Pedido Match: ", valorPedidoMatch);
    console.log("Quantidade Match: ", quantidadeMatch);

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

    // Valor do pedido e quantidade de acessos
    let valorPedido = 0;
    let quantidade = 0;

    if (valorPedidoMatch) {
        valorPedido = parseFloat(valorPedidoMatch[1].replace(',', '.'));
    }

    if (quantidadeMatch) {
      console.log("Novo: ", quantidadeMatch[1]);
      console.log("Aditivo: ", quantidadeMatch[2]);
      console.log("Portabilidades: ", quantidadeMatch[3] || "Não encontrada");
      console.log("Renegociação: ", quantidadeMatch[4]);

      if (parseInt(quantidadeMatch[1]) > 0) {  // Se Novo for maior que 0
          quantidade = parseInt(quantidadeMatch[1]);
      } else if (parseInt(quantidadeMatch[2]) > 0) {  // Se Aditivo for maior que 0
          quantidade = parseInt(quantidadeMatch[2]);
      } else if (parseInt(quantidadeMatch[4]) > 0) {  // Se Renegociação for maior que 0
          quantidade = parseInt(quantidadeMatch[4]);
      }

      console.log("Quantidade final: ", quantidade);

  } else {
      console.log("Quantidade não encontrada");
  }
    // Retornando os dados extraídos
    const dadosExtraidos = {
      vtme: vtmeMatch ? vtmeMatch[1] : 'Não encontrado',
      cliente: nomeClienteMatch ? nomeClienteMatch[1].trim() : 'Não encontrado',
      consultor: consultorMatch ? consultorMatch[1] : 'Não encontrado',
      tipo: tipoCliente,
      cnpj: cnpjMatch ? cnpjMatch[1] : 'Não encontrado',
      quantidade: quantidade,
      valor: valorPedido
  };

  // Armazenando os dados extraídos no localStorage como JSON
  localStorage.setItem('dadosCliente', JSON.stringify(this.listVTME));
  console.log(localStorage.getItem('dadosCliente'))

  // Retornando os dados extraídos
  return dadosExtraidos;
}
adicionarNoLocalStorage(novoItem: InterfaceEmailPadrao) {

  this.listVTME.push(novoItem);
 localStorage.setItem('dadosCliente', JSON.stringify(this.listVTME))

 console.log('Dados no local storage', this.listVTME)
}



apagar(){
  this.listVTME = []
}
}
