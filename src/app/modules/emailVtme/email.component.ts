import { InterfaceEmailPadrao } from '../../inteface/interface-email-padrao';
import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  inject,
  Output,
} from '@angular/core';
import { TextoService } from '../../service/texto.service';
import { EmailPadraoComponent} from '../email-padrao/email-padrao.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-email',
  standalone: true,
  imports: [EmailPadraoComponent, RouterModule],
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.scss','../email-padrao/email-padrao.component.scss']

})
export class EmailComponent {
  #cdr = inject(ChangeDetectorRef);

  @Output() public outputAddtexto = new EventEmitter<InterfaceEmailPadrao>();

  public dataPedido = new Date();

  public listVTME: Array<InterfaceEmailPadrao> = JSON.parse(
    localStorage.getItem('dadosCliente') || '[]'
  );

  constructor(private textoService: TextoService, private cdr: ChangeDetectorRef) {}


  addTexto(value: string) {
    if (value) {
      const dadosExtraidos = this.extrairDadosDoTexto(value);

      this.adicionarNoLocalStorage(dadosExtraidos);

      // Atualiza o serviço com os dados
      this.textoService.setTexto(dadosExtraidos);
      this.outputAddtexto.emit(dadosExtraidos);

      // Atualiza o componente se necessário
      this.cdr.detectChanges();

    }
  }

  extrairDadosDoTexto(texto: string): InterfaceEmailPadrao {
    // Regex para capturar o número do VTME
    const regexVtme = /Nº VTME:\s*(\d+)/;

    // Regex para capturar o nome do consultor (aceita qualquer caractere até " - ")
    const regexConsultor = /Consultor\s+(.+?)\s+-\s+.+/;

    // Regex para capturar o tipo de cliente
    const regexTipoCliente = /Cliente\s+Novo\s*(\d+)\s*Aditivo\s*(\d+)\s*Portabilidades\s*\d*\s*Renegociação\s*(\d+)/;

    // Regex para capturar o nome do cliente (depois da segunda ocorrência de "Cliente", até "CNPJ")
    const regexNomeCliente = /(?:Cliente\s+){2}([\s\S]+?)\s*CNPJ/;

    // Regex para capturar o CNPJ
    const regexCnpj = /CNPJ\s+(\d{14})/;

    // Regex para capturar o "Valor Pedido"
    const regexValorPedido = /Valor Pedido\s*R\$\s*([\d.,]+)\s*Serviços Adicionais/;

    // Regex para capturar as quantidades após os tipos de cliente
    const regexQuantidade =
      /Novo\s*(\d+)[\s\S]*?Aditivo\s*(\d+)[\s\S]*?Portabilidades\s*(\d*)[\s\S]*?Renegociação\s*(\d+)/;

    // Match dos valores no texto
    const vtmeMatch = texto.match(regexVtme);
    const consultorMatch = texto.match(regexConsultor);
    const tipoClienteMatch = texto.match(regexTipoCliente);
    const nomeClienteMatch = texto.match(regexNomeCliente);
    const cnpjMatch = texto.match(regexCnpj);
    const valorPedidoMatch = texto.match(regexValorPedido);
    const quantidadeMatch = texto.match(regexQuantidade);

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
      if (parseInt(quantidadeMatch[1]) > 0) {
        quantidade = parseInt(quantidadeMatch[1]);
      } else if (parseInt(quantidadeMatch[2]) > 0) {
        quantidade = parseInt(quantidadeMatch[2]);
      } else if (parseInt(quantidadeMatch[4]) > 0) {
        quantidade = parseInt(quantidadeMatch[4]);
      }
    }

    const dadosExtraidos = {
      vtme: vtmeMatch ? vtmeMatch[1] : 'Não encontrado',
      cliente: nomeClienteMatch ? nomeClienteMatch[1].trim() : 'Não encontrado',
      consultor: consultorMatch ? consultorMatch[1].trim() : 'Não encontrado',
      tipo: tipoCliente,
      cnpj: cnpjMatch ? cnpjMatch[1] : 'Não encontrado',
      quantidade: quantidade,
      valor: valorPedido,
      data: this.dataPedido
    };

    // Armazenando os dados extraídos no localStorage como JSON
    localStorage.setItem('dadosCliente', JSON.stringify(this.listVTME));
    console.log(localStorage.getItem('dadosCliente'));
    console.log(quantidade)

    return dadosExtraidos;

  }


  adicionarNoLocalStorage(novoItem: InterfaceEmailPadrao) {
    // Verificar se o número do VTME já está na lista
    const existeVtme = this.listVTME.some(
      (item) => item.vtme === novoItem.vtme
    );

    if (existeVtme) {
      console.log('O VTME já existe. Não será adicionado novamente.');
    } else {
      // Se não existe, adicionar o novo item

      this.listVTME.push(novoItem);
      localStorage.setItem('dadosCliente', JSON.stringify(this.listVTME));
      console.log('Novo item adicionado ao localStorage:', novoItem);
    }
  }
}
