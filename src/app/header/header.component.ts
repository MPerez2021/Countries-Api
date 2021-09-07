import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  theme = [
    { name: 'Detect theme' },
    { name: 'Dark' },
    { name: 'Light' }
  ]

  test = 'Theme'
  element = document.getElementsByTagName('app-root');
  constructor() { }

  ngOnInit(): void {
    /*Guardar en el storage el tema elegido*/
    const currenTheme = localStorage.getItem('theme');
    if (currenTheme == 'dark') {
      this.element[0].classList.add('dark-mode')
    }
    /* this.detectSystemColorScheme() */
  }

  darkMode() {
    let theme = 'light'
    //Cuando se cambia a la clase active se cambia el buton para darkMode
    const toggle = document.getElementById('toggle');
    toggle?.classList.toggle('active')
    //Intercambia entre clases para cambiar el estilo 
    this.element[0].classList.toggle('dark-mode')
    if (this.element[0].classList.contains('dark-mode')) {
      theme = 'dark'
    }
    localStorage.setItem('theme', theme)
  }

  darkModeV2(tema: string) {
    let theme = 'light'

    switch (tema) {
      case 'Detect theme':
        this.detectSystemColorScheme()   
        break
      case 'Dark':
        this.element[0].classList.add('dark-mode')
        if (this.element[0].classList.contains('dark-mode')) {
          theme = 'dark'
        }      
        localStorage.setItem('theme', theme)
        break
      case 'Light':
        this.element[0].classList.remove('dark-mode')
        theme = 'light'       
        localStorage.setItem('theme', theme)
        break
      default:
        break
    }

  }

  detectSystemColorScheme() {
    const preferDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
    let scheme = document.getElementsByTagName('app-root');
    let tema = 'light'
    if (preferDarkScheme.matches) {
      scheme[0].classList.add('dark-mode')
      tema = 'dark'
    } else {
      scheme[0].classList.remove('dark-mode')
    }
    localStorage.setItem('theme', tema)
  }

  seeMenu(){
    const menu = document.getElementsByClassName('header__links')
    menu[0].classList.toggle('show');
  }
}
