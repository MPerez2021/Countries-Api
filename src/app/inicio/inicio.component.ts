import { CountriesService } from './../servicios/countries.service';
import { Component, OnInit } from '@angular/core';
import { Countries } from '../modelos/countries';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  countries: any
  constructor(private countriesSvc: CountriesService) { 
    this.countriesSvc.getCountry().subscribe(datos=>{    
      this.countries = datos      
    })  

    
  }

  ngOnInit(): void {
  }

}
