import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../shared/services/countries.service';
import { CountryType } from '../../shared/interface/types';
import { FilterComponent } from './components/filter/filter.component';
import { CountriesTableComponent } from './components/countries-table/countries-table.component';
import { CommonModule } from '@angular/common';
import { SearchFieldComponent } from './components/search-field/search-field.component';

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
  countriesDataSortByName: CountryType[] = []

  pages: number[] = []
  totalPages: number = 0
  itemsPerPage: number = 15
  currentPage: number = 1

  constructor(private countriesService: CountriesService) {}

  ngOnInit(): void {
    this.getAllCountries()
  }

  public getAllCountries(): void {
    this.countriesService.getAllCountries().subscribe({
      next: response => {
        this.allCountriesData = response

        this.countriesDataSortByName = this.allCountriesData.sort((a, b) => {
          return a.name.common.localeCompare(b.name.common)
        })

        this.totalPages = Math.ceil(this.allCountriesData.length / this.itemsPerPage)
        this.changePage(this.currentPage)
      },
      error: error => console.error(error)
    })
  }

  public changePage(page: number): void {
    if (page < 1 || page > this.totalPages) {
      return
    }

    this.currentPage = page
    const start = (page - 1) * this.itemsPerPage
    const end = start + this.itemsPerPage

    this.countriesData = this.allCountriesData.slice(start, end)
  }

  public sortTable(criteria: string) {
    switch(criteria) {
      case 'Population':
        this.countriesData.sort((a, b) => a.population - b.population)
        break
      case 'Area(km²)':
        this.countriesData.sort((a, b) => a.area - b.area)
        break
      case 'Alphabetically, A-Z':
        this.countriesData.sort((a, b) => a.name.common.localeCompare(b.name.common))
        break
      case 'Alphabetically, Z-A':
        this.countriesData.sort((a, b) => b.name.common.localeCompare(a.name.common))
        break
      default:

    }
  }
}
