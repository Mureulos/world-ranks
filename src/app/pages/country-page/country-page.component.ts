import { Component, Input } from '@angular/core';
import { CountryType } from '../../shared/interface/types';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-country-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './country-page.component.html',
  styleUrl: './country-page.component.scss'
})
export class CountryPageComponent {
  @Input() data: CountryType[] = []
}
