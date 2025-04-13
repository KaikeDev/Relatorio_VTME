import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { EmailPadraoComponent } from '../email-padrao/email-padrao.component';
import { NavComponent } from '../nav/nav.component';
import { RouterLink } from '@angular/router';
import { SearchComponent } from '../search/search.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeaderComponent,
    NavComponent,
    RouterLink,
    SearchComponent,
    CommonModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  public dadosCliente: any[] = [];
  public dadosFiltrados: any[] = []; // Lista para armazenar os dados filtrados

  // Para controlar os filtros (se for por nome, CNPJ, etc)
  public filtroBusca: string = '';

  ngOnInit(): void {
    this.dadosCliente = this.getDadosCliente();

    const hoje = new Date();
    this.dadosFiltrados = this.dadosCliente.filter((registro) => {
      const dataRegistro = new Date(registro.data);
      return (
        dataRegistro.getDate() === hoje.getDate() &&
        dataRegistro.getMonth() === hoje.getMonth() 
      );
    });
  }

  public getDadosCliente(): any[] {
    const dadosCliente = localStorage.getItem('dadosCliente');
    return dadosCliente ? JSON.parse(dadosCliente) : [];
  }

  // Função para filtrar os dados de acordo com a busca
  public getSearch({ field, value }: { field: string; value: string }): void {
    const dadosCliente = localStorage.getItem('dadosCliente');

    if (dadosCliente) {
      const dados = JSON.parse(dadosCliente); // Converte os dados de JSON para objeto

      this.filtroBusca = value.trim(); // Remove espaços extras ao redor da busca

      // Aplica o filtro nos dados de acordo com o campo
      this.dadosFiltrados = dados.filter((res: any) => {
        // Verifique se o campo passado realmente existe em cada objeto
        const fieldValue = res[field]
          ? res[field].toString().toLowerCase().trim()
          : '';

        return fieldValue.includes(this.filtroBusca.toLowerCase());
      });
    } else {
    }
  }
}
