import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';
import { CountryType } from '../interface/types';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {
  private urlAllCountries: string = environment.urlAllCountries
  private urlName: string = environment.urlCountryName
  private urlCode: string = environment.urlCountryCode
  private urlCurrency: string = environment.urlCountryCurrency
  private urlLanguage: string = environment.urlCountryLanguage
  private urlCapitalCity: string = environment.urlCountryCapitalCity
  private urlRegion: string = environment.urlCountryRegion
  private urlSubregion: string = environment.urlCountryRegion
  private urlTranslation: string = environment.urlCountryTranslation

  constructor(private httpClient: HttpClient) {}

  getAllCountries(): Observable<CountryType[]> {
    return this.httpClient.get<CountryType[]>(this.urlAllCountries)
  }

  getCountryByFullName(name: string): Observable<CountryType> {
    return this.httpClient.get<CountryType>(`${this.urlName}${name}`)
  }

  getCountryByCode(code: string): Observable<CountryType> {
    return this.httpClient.get<CountryType>(`${this.urlCode}${code}`)
  }

  getCountryByLanguage(language: string): Observable<CountryType[]> {
    return this.httpClient.get<CountryType[]>(`${this.urlLanguage}${language}`)
  }
  
  getCountryByCapitalCity(city: string): Observable<CountryType> {
    return this.httpClient.get<CountryType>(`${this.urlCapitalCity}${city}`)
  }

  getCountryByRegion(region: string): Observable<CountryType[]> {
    return this.httpClient.get<CountryType[]>(`${this.urlRegion}${region}`)
  }

  getCountryBySubregion(subregion: string): Observable<CountryType[]> {
    return this.httpClient.get<CountryType[]>(`${this.urlSubregion}${subregion}`)
  }

  getCountryByNameTranslation(translationName: string): Observable<CountryType> {
    return this.httpClient.get<CountryType>(`${this.urlTranslation}${translationName}`)
  }
}
