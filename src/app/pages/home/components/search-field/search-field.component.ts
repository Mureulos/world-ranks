import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-search-field',
  standalone: true,
  imports: [],
  templateUrl: './search-field.component.html',
  styleUrl: './search-field.component.scss'
})
export class SearchFieldComponent {
  @Input() NumberCountries: number = 0
}
