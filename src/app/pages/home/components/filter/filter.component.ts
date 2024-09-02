import { CommonModule } from '@angular/common'
import { Component, Output, EventEmitter } from '@angular/core'
import { FilterType } from '../../../../shared/interface/types'

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss'
})
export class FilterComponent {
  criteries = [
    'Population',
    'Area(km²)',
    'Alphabetically, A-Z',
    'Alphabetically, Z-A'
  ]

  regions: FilterType[] = [
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

  criteriaSort: string = 'Alphabetically, A-Z'
  apearSortClass: boolean = false
  apearStatusClass: boolean = false

  @Output() sort = new EventEmitter<string>()
  @Output() toggle = new EventEmitter()
  @Output() status = new EventEmitter()
  
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

    if (item.name === 'All') { // Se o toggle escolhido for All
      this.regions.forEach(toggle => toggle.active = false) // Desativa todos os toggle
      item.active = true // Ativa o toggle All
    } else {
      const allToggle = this.regions.find(toggle => toggle.name === 'All')
      if (allToggle) {allToggle.active = false } // Desativa o toggle all
      item.active = !item.active // Ativa o toggle escolhido
    }

    // Cria um array apenas com os toggles ativados
    const activeRegions = this.regions
      .filter(toggle => toggle.active)
      .map(toggle => toggle.name)

    this.toggle.emit(activeRegions)
  }
  
  public checkStatus(item: any, event: Event) {
    event.preventDefault()
    
    if (item.active === false) { // Se o checkbox escolhido estiver desativado
      this.statusOptions.forEach(e => e.active = false) // Desativa todos os checkbox
      item.active = true // Ativa o checkbox escolhido
    } else {
      this.statusOptions.forEach(e => e.active = false)
    }

    const activeStatus = this.statusOptions
      .filter(status => status.active)
      .map(status => status.name)

    this.status.emit(activeStatus[0])
  }
}
