// home.component.ts
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
  countriesData: CountryType[] = [];
  allCountriesData: CountryType[] = [];
  countriesDataSort: CountryType[] = [];

  pages: number[] = [];
  totalPages: number = 0;
  itemsPerPage = 15;
  currentPage = 1;

  constructor(private countriesService: CountriesService) {}

  ngOnInit(): void {
    this.getAllCountries();
  }

  public getAllCountries(sortCriteria: string = 'Alphabetically, A-Z'): void {
    this.countriesService.getAllCountries().subscribe({
      next: (response) => {
        this.allCountriesData = response;
        this.countriesDataSort = this.sortCountries(this.allCountriesData, sortCriteria);
        this.totalPages = Math.ceil(this.allCountriesData.length / this.itemsPerPage);
        this.paginate(this.currentPage);
      },
      error: (error) => console.error(error),
    });
  }

  public sortCountries(data: CountryType[], criteria: string): CountryType[] {
    switch (criteria) {
      case 'Population':
        return data.sort((a, b) => b.population - a.population);

      case 'Area(km²)':
        return data.sort((a, b) => b.area - a.area);

      case 'Alphabetically, Z-A':
        return data.sort((a, b) => b.name.common.localeCompare(a.name.common));

      default: 
        return data.sort((a, b) => a.name.common.localeCompare(b.name.common));
    }
  }

  public paginate(page: number): void {
    if (page < 1 || page > this.totalPages) {
      return
    }

    this.currentPage = page;
    const start = (page - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    
    this.countriesData = this.countriesDataSort.slice(start, end);
  }

  public handleSort(criteria: string): void {
    this.countriesDataSort = this.sortCountries(this.allCountriesData, criteria);
    this.paginate(this.currentPage);
  }
}
