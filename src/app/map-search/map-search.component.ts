import { CountriesService } from './../servicios/countries.service';
import { Component, OnInit } from '@angular/core';
import { } from '@angular/google-maps';
import { Countries } from '../modelos/countries';

@Component({
  selector: 'app-map-search',
  templateUrl: './map-search.component.html',
  styleUrls: ['./map-search.component.css']
})
export class MapSearchComponent {

  country: Countries = {
    name: '',
    population: 0,
    timezones: [],
    borders: [],
    currencies: [],
    languages: []
  }

  countryFound: Countries
  constructor(private countriesSvc: CountriesService) {

  }

  initMap() {
    const uluru = { lat: -25.344, lng: 131.036 };
    const map = new google.maps.Map(document.getElementById('map') as HTMLElement, {
      center: uluru,
      zoom: 4
    })
  }

  ngAfterViewInit(): void {
    this.initMap()
  }

  handleSubmit(event: any, name: string) {
    event.preventDefault()
    this.countriesSvc.getCountryByName(name).subscribe(data=>{
      this.countryFound = data   
      console.log(this.countryFound);       
    })
  }

  newSearch(){
    this.countryFound = this.country
    this.country.name = ''
  }
}
