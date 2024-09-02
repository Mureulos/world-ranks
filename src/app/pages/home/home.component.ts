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
  itemsPerPage: number = 15
  currentPage: number = 1

  criteriaSort: string = 'Alphabetically, A-Z'
  activeRegions: string[] = ['All']
  activeStatus: string = ''
  searchTerm: string = ''

  constructor(private countriesService: CountriesService) {}

  ngOnInit(): void {
    this.getAllCountries()
  }

  public getAllCountries(): void {
    this.countriesService.getAllCountries().subscribe({ // Chama o serviço que puxa todos os paises da api
      next: (response) => {
        this.allCountriesData = response
        this.applyCombinedFilters()
      },
      
      error: (error) => console.error(error),
    })
  }


  public handleSearch(searchTerm: string): void {
    this.searchTerm = searchTerm.toLowerCase()
    this.applyCombinedFilters()
  }

  public handleSort(criteria: string): void {
    this.criteriaSort = criteria
    this.applyCombinedFilters()
  }

  public handleToggle(activeRegions: string[]): void {
    this.activeRegions = activeRegions
    this.applyCombinedFilters()
  }

  public handleStatus(status: string): void {
    this.activeStatus = status
    this.applyCombinedFilters()
  }


  public applyCombinedFilters(): void {
    let filteredData = this.allCountriesData

    filteredData = this.allCountriesData.filter(country =>
      // caso o nome dos paises inclua o termo da pesquisa
      country.name.common.toLowerCase().includes(this.searchTerm) || 

      // caso o código dos paises inclua o termo da pesquisa
      (country.cca2 && country.cca2.toLowerCase().includes(this.searchTerm)) 
    )

    if (!this.activeRegions.includes('All')) { // Caso não inclua All
      filteredData = filteredData.filter(country => this.activeRegions.includes(country.region)) // Filtra pela região
    } 
    
    filteredData = this.filterStatusCountries(filteredData, this.activeStatus) // Filtra pelo status
    this.countriesDataSort = this.sortCountries(filteredData, this.criteriaSort) // Ordena de acordo com o criterio

    /*
      Atribui o total de paginas. Arredonda a divisão da quantidade 
      de elementos dos paises ordenados pela quantidade de itens por página
    */
    this.totalPages = Math.ceil(this.countriesDataSort.length / this.itemsPerPage)
    this.changePage(1)
  }
  
  public sortCountries(data: CountryType[], criteria: string): CountryType[] {
    switch (criteria) { // Ordena o array de paises de acordo com o critério
      case 'Population':
        return data.sort((a, b) => b.population - a.population)

      case 'Area(km²)':
        return data.sort((a, b) => b.area - a.area)

      case 'Alphabetically, Z-A':
        return data.sort((a, b) => b.name.common.localeCompare(a.name.common))

      default: // A até Z
        return data.sort((a, b) => a.name.common.localeCompare(b.name.common))
    }
  }

  public filterStatusCountries(data: CountryType[], status: string): CountryType[] {
    if (status === 'Member of the United Nations') { // paises que pertencem as nações unidas
      return data.filter(country => country.unMember === true)
    } 
    
    else if (status === 'Independent') { // paises que pertencem as nações unidas
      return data.filter(country => country.independent === true)
    } 
    
    else { //Sem status de paises
      return data
    }
  }

  public changePage(page: number): void {
    if (page < 1 || page > this.totalPages) // Caso esteja não ultima ou na primera página
      return // Impede a mudança de página

    // Atribui a pagina para atual
    this.currentPage = page 

    // Define o inicio da paginação de acordo com a aritmética
    const start = (page - 1) * this.itemsPerPage 
    
    // Define o final da paginação de acordo com a aritmética
    const end = start + this.itemsPerPage 

    this.countriesData = this.countriesDataSort.slice(start, end) // Corta o array de paises de acordo com o inicio e o final
  }
}
