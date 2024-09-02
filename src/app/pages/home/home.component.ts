// home.component.ts
import { Component, OnInit } from '@angular/core'
import { CountriesService } from '../../shared/services/countries.service'
import { CountryType } from '../../shared/interface/types'
import { FilterComponent } from './components/filter/filter.component'
import { CountriesTableComponent } from './components/countries-table/countries-table.component'
import { CommonModule } from '@angular/common'
import { SearchFieldComponent } from './components/search-field/search-field.component'

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FilterComponent, CountriesTableComponent, SearchFieldComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  countriesData: CountryType[] = []
  allCountriesData: CountryType[] = []
  countriesDataSort: CountryType[] = []

  pages: number[] = []
  totalPages: number = 0
  itemsPerPage = 15
  currentPage = 1

  constructor(private countriesService: CountriesService) {}

  ngOnInit(): void {
    this.getAllCountries()
  }

  public getAllCountries(sortCriteria: string = 'Alphabetically, A-Z'): void {
    this.countriesService.getAllCountries().subscribe({
      next: (response) => {
        this.allCountriesData = response
        this.countriesDataSort = this.sortCountries(this.allCountriesData, sortCriteria)
        this.totalPages = Math.ceil(this.allCountriesData.length / this.itemsPerPage)
        this.changePage(this.currentPage)
      },
      
      error: (error) => console.error(error),
    })
  }

  public handleSearch(searchTerm: string): void {
    const lowerCaseSearchTerm = searchTerm.toLowerCase()

    this.countriesDataSort = this.allCountriesData.filter(country =>
      country.name.common.toLowerCase().includes(lowerCaseSearchTerm) ||
      country.region.toLowerCase().includes(lowerCaseSearchTerm) ||
      (country.cca2 && country.cca2.toLowerCase().includes(lowerCaseSearchTerm))
    )

    this.totalPages = Math.ceil(this.countriesDataSort.length / this.itemsPerPage)
    this.changePage(1)
  }
  
  public handleSort(criteria: string): void {
    this.countriesDataSort = this.sortCountries(this.allCountriesData, criteria)
    this.changePage(this.currentPage)
  }
  
  public sortCountries(data: CountryType[], criteria: string): CountryType[] {
    switch (criteria) {
      case 'Population':
        return data.sort((a, b) => b.population - a.population)

      case 'Area(km²)':
        return data.sort((a, b) => b.area - a.area)

      case 'Alphabetically, Z-A':
        return data.sort((a, b) => b.name.common.localeCompare(a.name.common))

      default: 
        return data.sort((a, b) => a.name.common.localeCompare(b.name.common))
    }
  }

  public handleToggle(activeRegions: string[]): void {
    if (activeRegions.includes('All')) {
      this.countriesDataSort = this.allCountriesData

    } else {
      this.countriesDataSort = this.allCountriesData
        .filter(country => activeRegions.includes(country.region))
    }
    
    this.totalPages = Math.ceil(this.countriesDataSort.length / this.itemsPerPage)
    this.changePage(1)
  }

  public handleStatus(status: string): void {
    this.countriesDataSort = this.filterStatusCountries(this.allCountriesData, status)
    this.totalPages = Math.ceil(this.countriesDataSort.length / this.itemsPerPage)
    this.changePage(1)
  }

  public filterStatusCountries(data: CountryType[], status: string): CountryType[] {
    switch (status) {
      case 'Member of the United Nations':
        return data.sort((a, b) => b.population - a.population)

      case 'Independent':
        return data.sort((a, b) => b.area - a.area)

      default: 
        return data
    }
  }

  public changePage(page: number): void {
    if (page < 1 || page > this.totalPages) {
      return
    }

    this.currentPage = page
    const start = (page - 1) * this.itemsPerPage
    const end = start + this.itemsPerPage
    
    this.countriesData = this.countriesDataSort.slice(start, end)
  }
}
