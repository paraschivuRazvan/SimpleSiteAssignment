import { Component, OnInit } from '@angular/core';
import { CrimesService } from './crimes.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-crimes',
  templateUrl: './crimes.component.html',
  styleUrls: ['./crimes.component.scss'],
  providers: [CrimesService]
})
export class CrimesComponent implements OnInit {
  private subscription: Subscription = new Subscription();

  constructor(
    private crimesService: CrimesService
  ) { }

  ngOnInit() {
    this.getCrimes();
  }

  private getCrimes() {
    this.subscription.add(this.crimesService.getTopCrimes().subscribe(
      (resp: any) => {
        console.log(resp);
      },
      error => {
        console.error('CONTROLLER ERROR ' + error.message);
      }
    ));
  }

}
