import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title(title: any) {
    throw new Error('Method not implemented.');
  }

  links: any[] = [];
  activeLink: any = -1;
  

  constructor(private router: Router) { 
    this.links = [
      {
        label: `Home`,
        link: ``,
        index: 0
      },
      {
        label: `Users`,
        link: `./edit/:postId`,
        index: 1
      }
    ]
  }

  ngOnInit(): void {
    this.router.events.subscribe((res) => {
      this.activeLink = this.links.indexOf(this.links.find(tab => tab.link === '.' + this.router.url));
  });
  }

}
