import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Countries } from '../modelos/countries';
@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  constructor(private HttpCliente: HttpClient) { }

  private apiUrl = 'https://restcountries.eu/rest/v2/all';
  getCountry(): Observable<Countries>{
    return this.HttpCliente.get<Countries>(this.apiUrl)
  }
}
