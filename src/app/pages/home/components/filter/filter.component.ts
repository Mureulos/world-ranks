import { CommonModule } from '@angular/common'
import { Component, Output, EventEmitter } from '@angular/core'
import { map, filter, find } from 'rxjs';
import { FilterType } from '../../../../shared/interface/types';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss'
})
export class FilterComponent {
  @Output() sort = new EventEmitter<string>()
  criteries = [
    'Population',
    'Area(km²)',
    'Alphabetically, A-Z',
    'Alphabetically, Z-A'
  ]
  apearSortClass: boolean = false
  criteriaSort: string = 'Alphabetically, A-Z'

  @Output() toggle = new EventEmitter()
  togglesOptions: FilterType[] = [
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

  @Output() status = new EventEmitter()
  statusOptions: FilterType[] = [
    {
      name: 'Independent',
      active: false
    },
    {
      name: 'Member of the United Nations',
      active: false
    }
  ]
  apearStatusClass: boolean = false
  
  public showSortOptions() {
    this.apearSortClass = !this.apearSortClass
  }

  public emitSort(criteria: string) {
    this.sort.emit(criteria)
    this.criteriaSort = criteria
    this.showSortOptions()
  }

  public toggleRegion(item: any, event: Event) {
    event.preventDefault()

    if (item.name === 'All') {
      this.togglesOptions.forEach(toggle => toggle.active = false)
      item.active = true
    } else {
      const allToggle = this.togglesOptions.find(toggle => toggle.name === 'All')
      if (allToggle) {allToggle.active = false}
      item.active = !item.active
    }

    const activeRegions = this.togglesOptions
      .filter(toggle => toggle.active)
      .map(toggle => toggle.name)

    this.toggle.emit(activeRegions)
  }
  
  public checkStatus(item: any, event: Event) {
    event.preventDefault()
    
    if (item.active == false) {
      this.statusOptions.forEach(e => e.active = false)
      item.active = true
    } else {
      this.statusOptions.forEach(e => e.active = false)
    }

    const activeStatus = this.statusOptions
      .filter(status => status.active)
      .map(status => status.name)

    this.status.emit(activeStatus[0])
  }
}
