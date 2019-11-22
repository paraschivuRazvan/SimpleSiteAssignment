import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { CrimesService } from './crimes.service';
import { Subscription } from 'rxjs';
import { Crime } from './crimes.model';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-crimes',
  templateUrl: './crimes.component.html',
  styleUrls: ['./crimes.component.scss'],
  providers: [CrimesService]
})
export class CrimesComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  public showLoading = false;

  displayedColumns: string[] = ['category', 'arrest_count'];
  dataSource = new MatTableDataSource<Crime>([]);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private crimesService: CrimesService
  ) { }

  ngOnInit() {
    this.getCrimes();

    this.dataSource.filterPredicate = function (data, filter: string): boolean {
      return data.Category.toLowerCase().includes(filter);
    };
  }

  private getCrimes() {
    this.showLoading = true;
    this.subscription.add(this.crimesService.getTopCrimes().subscribe(
      (resp: Crime[]) => {
        this.setUpDataSource(resp);
      },
      error => {
        console.error('CONTROLLER ERROR ' + error.message);
        this.showLoading = false;
      }
    ));
  }

  private setUpDataSource(resp: Crime[]) {
    this.dataSource = new MatTableDataSource(resp);
    this.dataSource.paginator = this.paginator;
    this.showLoading = false;
  }

  public applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
