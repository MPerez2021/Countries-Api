import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Countries } from '../modelos/countries';
import { map, switchMap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class CountriesService {
 
  constructor(private HttpCliente: HttpClient) { }

  private apiUrl = 'https://restcountries.eu/rest/v2/all';
  private apiUrlByCode = 'https://restcountries.eu/rest/v2/alpha/'
  private apiUrlByName = 'https://restcountries.eu/rest/v2/name/'
  
  getCountry() {
    return this.HttpCliente.get<Countries[]>(this.apiUrl)
  }

  getOneCountryByCode(code:string): Observable<Countries> {
    return this.HttpCliente.get<Countries>(this.apiUrlByCode + `${code}`)
  }

  getCountryByName(name:string): Observable<Countries>{
    return this.HttpCliente.get<Countries>(this.apiUrlByName + `${name}` + '?fullText=true')

  }
 
}
