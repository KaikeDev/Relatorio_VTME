import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {


  @Output() public emmitSearch: EventEmitter<string> = new EventEmitter();

  public search(value: string){
   this.emmitSearch.emit(value);
  }
}
