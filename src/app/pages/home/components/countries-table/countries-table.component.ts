import { Component, Input } from '@angular/core';
import { CountryType } from '../../../../shared/interface/types';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-countries-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './countries-table.component.html',
  styleUrl: './countries-table.component.scss'
})
export class CountriesTableComponent {
  @Input() data: CountryType[] = []
}
