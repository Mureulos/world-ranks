import { Component, Input, Output, OnInit, EventEmitter, ElementRef, ViewChild, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CountriesService } from '../../../../shared/services/countries.service';
import { Observable, debounceTime, distinctUntilChanged, fromEvent, map } from 'rxjs';

@Component({
  selector: 'app-search-field',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './search-field.component.html',
  styleUrl: './search-field.component.scss'
})
export class SearchFieldComponent {
  @Input() NumberCountries: number = 0;
  @Output() search = new EventEmitter<string>();

  onSearch(searchTerm: string): void {
    this.search.emit(searchTerm);
  }
}