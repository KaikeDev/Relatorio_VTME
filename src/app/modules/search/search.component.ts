import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {


  // Componente de busca (app-search)
@Output() public emmitSearch: EventEmitter<{ field: string, value: string }> = new EventEmitter();

public emitSearch(value: string, field: string) {
  this.emmitSearch.emit({ field, value });
}

}
