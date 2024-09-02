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
    this.countryData = history.state.countryData // Atribui os dados do pais salvo no state

    if (!this.countryData) { // Caso não exista dados do pais
      this.router.navigate(['/'])
    }

    if(this.countryData?.borders) {  // Caso o pais tenha fronteiras
      this.searchBorderCountries(this.countryData.borders) // passa as fronteiras como parâmetro
    }
  }

  public searchBorderCountries(borders: string[]) {
    // Atribui em um array os dados (observables) de cada fronteira através do serviço
    const requests = borders.map(code => {
      return this.countriesService.getCountryByCode(code)
    })

    forkJoin(requests).subscribe({ // Inscreve os observables no borderCountries, atribuind apenas os arrays
      next: (responses: any[]) => {this.borderCountries = responses;}, 
      error: error => console.error('Erro ao buscar países de fronteira', error)
    });
  }
  
  public navigateToCountry(country: CountryType) {
    this.router.navigate(['/country', country.name.common], { // Cria uma rota com nome do pais selecionado
      state: { countryData: country } // Atribui os dados do pais selecionado para a variavel state
    })
    .then(
      () => window.location.reload() // Recarrega a pagina a página quando a ultima ação é concluida
    )
  }

  public navigateToHome() {
    this.router.navigate(['']) // Vai para a wilcard route
  }
}
