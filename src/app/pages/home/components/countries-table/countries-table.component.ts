import { Component, Input } from '@angular/core';
import { CountryType } from '../../../../shared/interface/types';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-countries-table',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './countries-table.component.html',
  styleUrl: './countries-table.component.scss'
})
export class CountriesTableComponent {
  @Input() data: CountryType[] = []

  constructor(private router: Router) {}

  navigateToCountry(country: CountryType): void {
    this.router.navigate(['/country', country.name.common], {
      state: { countryData: country }
    });
  }
}
