import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../shared/services/countries.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  constructor(private countriesService: CountriesService){}

  ngOnInit(): void {
    this.getAllCountries()
  }

  getAllCountries() {
    this.countriesService.getAllCountries();
  }
}
