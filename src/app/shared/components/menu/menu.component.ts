import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  public goTo(where) {
    switch (where) {
      case 'crimes': {
        this.router.navigate(['./main/crimes']);
      }
        break;
      case 'players':
        {
          this.router.navigate(['./main/players']);
        }
        break;
      case 'teams':
        {
          this.router.navigate(['./main/teams']);
        }
        break;
      case 'crime-timeline':
        {
          this.router.navigate(['./main/crime-timeline']);
        }
        break;
      default:
        {
          this.router.navigate(['./crimes']);
        }
    }
  }

}
