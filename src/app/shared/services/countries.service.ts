import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable, map } from 'rxjs';
import { CountryType } from '../interface/types';

@Injectable({
  providedIn: 'root',
})
export class CountriesService {
  // private urlAllCountries: string = environment.urlAllCountries
  // private urlName: string = environment.urlCountryName
  // private urlCode: string = environment.urlCountryCode
  // private urlCurrency: string = environment.urlCountryCurrency
  // private urlLanguage: string = environment.urlCountryLanguage
  // private urlCapitalCity: string = environment.urlCountryCapitalCity
  // private urlRegion: string = environment.urlCountryRegion
  // private urlSubregion: string = environment.urlCountryRegion
  // private urlTranslation: string = environment.urlCountryTranslation

  private urlAllCountries: string = 'https://restcountries.com/v3.1/all';
  private urlName: string = 'https://restcountries.com/v3.1/name/';
  private urlCode: string = 'https://restcountries.com/v3.1/alpha/';
  private urlCurrency: string = 'https://restcountries.com/v3.1/currency/';
  private urlLanguage: string = 'https://restcountries.com/v3.1/lang/';
  private urlCapitalCity: string = 'https://restcountries.com/v3.1/capital/';
  private urlRegion: string = 'https://restcountries.com/v3.1/region/';
  private urlSubregion: string = 'https://restcountries.com/v3.1/subregion/';
  private urlTranslation: string = 'https://restcountries.com/v3.1/translation/';

  constructor(private httpClient: HttpClient) {}

  getAllCountries(): Observable<CountryType[]> {
    return this.httpClient.get<CountryType[]>(this.urlAllCountries);
  }

  getCountryByFullName(name: string): Observable<CountryType> {
    return this.httpClient.get<CountryType>(`${this.urlName}${name}`)
  }

  getCountryByCode(code: string): Observable<CountryType> {
    return this.httpClient.get<CountryType>(`${this.urlCode}${code}`)
  }

  // getCountryByLanguage(language: string): Observable<CountryType[]> {
  //   return this.httpClient.get<CountryType[]>(`${this.urlLanguage}${language}`)
  // }

  // getCountryByCapitalCity(city: string): Observable<CountryType> {
  //   return this.httpClient.get<CountryType>(`${this.urlCapitalCity}${city}`)
  // }

  getCountryByRegion(region: string): Observable<CountryType[]> {
    return this.httpClient.get<CountryType[]>(`${this.urlRegion}${region}`)
  }

  // getCountryBySubregion(subregion: string): Observable<CountryType[]> {
  //   return this.httpClient.get<CountryType[]>(`${this.urlSubregion}${subregion}`)
  // }

  // getCountryByNameTranslation(translationName: string): Observable<CountryType> {
  //   return this.httpClient.get<CountryType>(`${this.urlTranslation}${translationName}`)
  // }
}
