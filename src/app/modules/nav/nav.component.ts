import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [ RouterModule, NgIf, RouterOutlet],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss',

})
export class NavComponent {

  menuAberto = false;

  toggleMenu() {
    this.menuAberto = !this.menuAberto;
  }

}
