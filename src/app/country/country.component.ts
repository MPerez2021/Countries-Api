import { CountriesCode } from './../modelos/countries-code';
import { Countries } from './../modelos/countries';
import { CountriesService } from './../servicios/countries.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})
export class CountryComponent implements OnInit {

  country: Countries
  countries: Countries[]
  countriesCodes: CountriesCode[] = []

  constructor(private countrySvc: CountriesService, private activeRoute: ActivatedRoute, 
    private router: Router) {
    const id = this.activeRoute.snapshot.params.id
    this.countrySvc.getOneCountry(id).subscribe(data => {
      this.country = data
    })
    this.countrySvc.getCountry().subscribe(datos => {
      this.countries = datos
      this.countries.forEach(data => {
        let code = data.alpha3Code
        let name = data.name
        this.countriesCodes.push({ code: code as string, name: name as string }) 
      })    
    })
  }

  ngOnInit(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = ()=> false
  }

  changeCodeForCountryName(code: string) {
    this.countriesCodes.forEach(data => {
      if (code === data.code) {
        code = data.name
      }      
    })
    return code
  }

  redirecTo(code:string){
    this.router.navigateByUrl('/inicio/' + code)
  }
}
