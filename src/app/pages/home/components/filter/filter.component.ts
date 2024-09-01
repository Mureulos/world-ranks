import { CommonModule } from '@angular/common'
import { Component, Output, EventEmitter } from '@angular/core'
import { map, filter, find } from 'rxjs';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss'
})
export class FilterComponent {
  @Output() toggle = new EventEmitter()
  toggles = [
    {
      name: 'All',
      active: true,
    },
    {
      name: 'Americas',
      active: false,
    },
    {
      name: 'Africa',
      active: false,
    },
    {
      name: 'Asia',
      active: false,
    },
    {
      name: 'Oceania',
      active: false,
    },
    {
      name: 'Europe',
      active: false,
    },
  ]
  
  @Output() sort = new EventEmitter<string>()
  apearClass: boolean = false
  disapearClass: boolean = true
  criteriaSort: string = 'Alphabetically, A-Z'
  
  public showOptions() {
    this.apearClass = !this.apearClass
    this.disapearClass = !this.disapearClass
  }

  public emitSort(criteria: string) {
    this.sort.emit(criteria)
    this.criteriaSort = criteria
  }

  public toggleRegion(item: any, event: Event) {
    event.preventDefault()

    if (item.name === 'All') {
      this.toggles.forEach(toggle => toggle.active = false)
      item.active = true
    } 
    
    else {
      const allToggle = this.toggles.find(toggle => toggle.name === 'All')
      
      if (allToggle) {
        allToggle.active = false
      }
      
      item.active = !item.active
    }

    const activeRegions = this.toggles
      .filter(toggle => toggle.active)
      .map(toggle => toggle.name)

    this.toggle.emit(activeRegions)
  }
}
