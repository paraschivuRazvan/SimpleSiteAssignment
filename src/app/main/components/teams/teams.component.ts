import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { TeamsService } from './teams.service';
import { Subscription } from 'rxjs';

import { Team } from './teams.model';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss']
})
export class TeamsComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  public showLoading = false;

  displayedColumns: string[] = ['Team', 'Team_preffered_name', 'Team_name', 'Team_city', 'Team_Conference', 'Team_Conference_Division', 'Team_logo_id', 'arrest_count'];
  dataSource = new MatTableDataSource<Team>([]);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private teamsService: TeamsService
  ) { }

  ngOnInit() {
    this.getTeams();

    this.dataSource.filterPredicate = function (data, filter: string): boolean {
      return data.Team.toLowerCase().includes(filter) || data.Team_preffered_name.toLowerCase().includes(filter) || data.Team_name.toLowerCase().includes(filter);
    };
  }

  private getTeams() {
    this.showLoading = true;
    this.subscription.add(this.teamsService.getTopTeams().subscribe(
      (resp: any) => {
        this.setUpDataSource(resp);
      },
      error => {
        console.error('CONTROLLER ERROR ' + error.message);
        this.showLoading = false;
      }
    ));
  }

  private setUpDataSource(resp: Team[]) {
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
