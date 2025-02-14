import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SearchComponent } from '../search/search.component';

@Component({
  selector: 'app-planilha',
  standalone: true,
  imports: [CommonModule, RouterModule, SearchComponent],
  templateUrl: './planilha.component.html',
  styleUrls: ['./planilha.component.scss'],
})
export class PlanilhaComponent implements OnInit {

  public dadosCliente: any[] = [];
  public dadosFiltrados: any[] = []; // Lista para armazenar os dados filtrados

  // Para controlar os filtros (se for por nome, CNPJ, etc)
  public filtroBusca: string = '';

  ngOnInit(): void {
    // Recupera os dados do localStorage quando o componente for inicializado
    this.dadosCliente = this.getDadosCliente();
    this.dadosFiltrados = this.dadosCliente; // Inicializa com todos os dados
    }

  public getDadosCliente(): any[] {
    const dadosCliente = localStorage.getItem('dadosCliente');
    return dadosCliente ? JSON.parse(dadosCliente) : [];
  }





  // Função para filtrar os dados de acordo com a busca
  public getSearch({ field, value }: { field: string, value: string }): void {
    const dadosCliente = localStorage.getItem('dadosCliente');

    if (dadosCliente) {
      const dados = JSON.parse(dadosCliente); // Converte os dados de JSON para objeto

      this.filtroBusca = value.trim(); // Remove espaços extras ao redor da busca
      console.log("Filtro de busca:", this.filtroBusca); // Verificando o valor da busca

      // Aplica o filtro nos dados de acordo com o campo
      this.dadosFiltrados = dados.filter((res: any) => {
        // Verifique se o campo passado realmente existe em cada objeto
        const fieldValue = res[field] ? res[field].toString().toLowerCase().trim() : '';
        console.log("Campo sendo filtrado:", field);  // Verifica o campo
        console.log("fieldValue:", fieldValue);  // Verifica o valor do campo
        console.log("Busca no campo:", fieldValue.includes(this.filtroBusca.toLowerCase())); // Verifica a comparação
        return fieldValue.includes(this.filtroBusca.toLowerCase());
      });

      console.log("Dados filtrados:", this.dadosFiltrados); // Verifique os dados após o filtro
    } else {
      console.log('Não há dados de cliente no localStorage.');
    }


  }






}
