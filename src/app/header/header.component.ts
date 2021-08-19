import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  element = document.getElementsByTagName('app-root');
  constructor() { }

  ngOnInit(): void {
    const currenTheme = localStorage.getItem('theme');
    if (currenTheme == 'dark') {
      this.element[0].classList.add('dark-mode')
    }
  }

  darkMode() {
    let theme = 'light'
    this.element[0].classList.toggle('dark-mode')
    if (this.element[0].classList.contains('dark-mode')) {
      theme = 'dark' 
    }
    localStorage.setItem('theme', theme)

  }
}
