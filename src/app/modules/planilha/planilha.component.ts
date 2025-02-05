import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-planilha',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './planilha.component.html',
  styleUrl: './planilha.component.scss',
})
export class PlanilhaComponent {

  public dadosCliente: any[] = [];


  public getDadosCliente() {
    const dadosCliente = localStorage.getItem('dadosCliente');
    return dadosCliente ? JSON.parse(dadosCliente) : [];
  }

  ngOnInit(): void {
    // Recupera os dados do localStorage quando o componente for inicializado
    this.dadosCliente = this.getDadosCliente();
    console.log(this.dadosCliente); // Aqui você pode verificar os dados
  }
}
