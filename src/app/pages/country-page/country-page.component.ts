import { Component, Input } from '@angular/core';
import { CountryType } from '../../shared/interface/types';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { map } from 'rxjs';

@Component({
  selector: 'app-country-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './country-page.component.html',
  styleUrl: './country-page.component.scss'
})
export class CountryPageComponent {
  countryData: CountryType | null = null;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.countryData = history.state.countryData;
    if (!this.countryData) {
      this.router.navigate(['/']);
    }
  }
}
