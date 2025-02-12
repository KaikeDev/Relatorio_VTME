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
    console.log(this.dadosCliente); // Aqui você pode verificar os dados
  }

  public getDadosCliente(): any[] {
    const dadosCliente = localStorage.getItem('dadosCliente');
    return dadosCliente ? JSON.parse(dadosCliente) : [];
  }

  // Função para filtrar os dados de acordo com a busca
  public getSearch(value: string): void {
    // Armazena o valor de busca
    this.filtroBusca = value;

    // Aplica o filtro nos dados
    this.dadosFiltrados = this.dadosCliente.filter((res: any) => {
      return res.cliente.toLowerCase().includes(value.toLowerCase()); // Comparando o nome do cliente
    });
  }
}
