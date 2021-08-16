import { CountriesService } from './../servicios/countries.service';
import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Countries } from '../modelos/countries';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent {

  countries: Countries[] = []
  countriesName: string
  countriesFound: Countries[]
  regions = [
    {
      name: 'All'
    },
    {
      name: 'Africa'
    },
    {
      name: 'Americas'
    },
    {
      name: 'Asia'
    },
    {
      name: 'Europe'
    },
    {
      name: 'Oceania'
    },
    {
      name: 'Polar'
    }
  ]
  totalCountries: number = 0
  filterName = 'Filter by Region'
  constructor(private countriesSvc: CountriesService, private cdr: ChangeDetectorRef) {
    this.countriesSvc.getCountry().subscribe(datos => {
      this.countries = datos
      this.totalCountries = this.countries.length
    })

  }

  ngOnInit(): void {
  }

  searchCountries(event: any) {
    let countriesFound: Countries[] = []
    let countryNames: Countries[] = []
    this.countries.forEach(data => {
      countriesFound.push(data)
    })

    let filterNames = countriesFound.filter(data => {
      return data.name?.indexOf(event.target.value)
    })
    console.log(filterNames);

    filterNames.forEach(data => {
      countryNames.push(data)
    })
    this.countriesFound = countryNames
    console.log(event);
  }

  filterByRegion(region: string) {
    let countriesByRegion: Countries[] = []
    this.countries.forEach(data => {
      if (data.region === region) {
        countriesByRegion.push(data)
        this.totalCountries = countriesByRegion.length
        this.filterName = region
      }
    })

    this.countriesFound = countriesByRegion
    if (region === 'All') {
      this.countriesFound = this.countries
      this.totalCountries = this.countriesFound.length
      this.filterName = region
    }
  }
}
