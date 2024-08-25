import { CommonModule } from '@angular/common';
import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss'
})
export class FilterComponent {
  apearClass: boolean = false
  disapearClass: boolean = true

  criteriaSort: string = 'Alphabetically, A-Z'
  @Output() sort = new EventEmitter<string>()
  

  public showOptions() {
    this.apearClass = !this.apearClass
    this.disapearClass = !this.disapearClass
  }

  public emitSort(criteria: string) {
    this.sort.emit(criteria)
    this.criteriaSort = criteria
  }
}
