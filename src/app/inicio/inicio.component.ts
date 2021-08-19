import { CountriesService } from './../servicios/countries.service';
import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Countries } from '../modelos/countries';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent {

  countries: Countries[] = []
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
  clear: string
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
    let filterCountryNames: Countries[] = []
    this.countries.forEach(data => {
      countriesFound.push(data)
    })

    let query = event.target.value.toLowerCase()
    this.clear = query

    filterCountryNames = countriesFound.filter(data => {
      return data.name.toLowerCase().indexOf(query) > -1
    })
    this.countriesFound = filterCountryNames
    this.totalCountries = this.countriesFound.length

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

  numberWithCommas(number: number) {
    return number.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
  }

  clearButton() {
    this.countriesFound = this.countries
    this.totalCountries = this.countriesFound.length
    let input = document.querySelectorAll('input')
    input.forEach(input => input.value = '') 
  }
  

}
