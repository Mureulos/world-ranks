import { Component } from '@angular/core';
import { CountryType } from '../../shared/interface/types';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CountriesService } from '../../shared/services/countries.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-country-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './country-page.component.html',
  styleUrl: './country-page.component.scss'
})
export class CountryPageComponent {
  countryData: CountryType | null = null
  borderCountries: any[] = []

  constructor(
    private countriesService: CountriesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.countryData = history.state.countryData;
    console.log(this.countryData)

    if (!this.countryData) {
      this.router.navigate(['/']);
    }

    if(this.countryData?.borders) {
      this.searchBorderCountries(this.countryData.borders)
    }
  }

  public searchBorderCountries(borders: string[]) {
    const requests = borders.map(code => this.countriesService.getCountryByCode(code));

    forkJoin(requests).subscribe({
      next: (responses: any[]) => {this.borderCountries = responses;},
      error: error => console.error('Erro ao buscar países de fronteira', error)
    });
  }
  
  public navigateToCountry(country: CountryType) {
    this.router.navigate(['/country', country.name.common], {
      state: { countryData: country }
    })
    .then(
      () => window.location.reload()
    )
  }

  public navigateToHome() {
    this.router.navigate([''])
  }
}
