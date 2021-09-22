import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { CountriesService } from './../servicios/countries.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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

  countryFound: any
  constructor(private countriesSvc: CountriesService) {
  }

  ver:boolean= false;
  initMap() {
    let infoWindow = new google.maps.InfoWindow();
    let uluru = { lat: -25.344, lng: 131.036 };
    const map = new google.maps.Map(document.getElementById('map') as HTMLElement, {
      center: uluru,
      zoom: 6
    })

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position: GeolocationPosition) => {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
        const marker = new google.maps.Marker({
          position: pos,
          map: map
        })
        map.setCenter(pos);
      })
    }
  }

  ngAfterViewInit(): void {
    this.initMap()
  }

  handleSubmit(event: any, name: string) {
    event.preventDefault()
    this.countriesSvc.getCountryByName(name).subscribe(data => {
      this.countryFound = data     
      let newMapPosition = {
        lat: this.countryFound[0].latlng[0],
        lng: this.countryFound[0].latlng[1]
      }      
      this.newMapUbication(newMapPosition)
    })
  }

  newMapUbication(mapPosition: any) {
    const map = new google.maps.Map(document.getElementById('map') as HTMLElement, {
      center: mapPosition,
      zoom: 5
    })

    
    let capital = 'Capital ' + this.countryFound[0].capital + '<br>'
    let lat =  'Latitud: ' + this.countryFound[0].latlng[0] + '<br>'
    let lon = 'Longitud: ' + this.countryFound[0].latlng[1]
      
   
    const contenido = document.getElementById('test') as HTMLElement
    const infoWindow = new google.maps.InfoWindow({
      content: capital + lat + lon,
      position: mapPosition
    })

    
    const marker = new google.maps.Marker({
      position: mapPosition,
      map: map
    })

    marker.addListener('click', () => {
      infoWindow.open(map, marker)
    })


    return mapPosition
  }

  newSearch() {
    this.countryFound = this.country
    this.country.name = ''    
  }

  numberWithCommas(number: number) {
    return number.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
  }

}
