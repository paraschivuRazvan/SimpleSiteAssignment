import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { PlayersService } from './players.service';
import { Subscription } from 'rxjs';
import { Player } from './players.model';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.scss'],
  providers: [PlayersService]
})
export class PlayersComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  public showLoading = false;

  displayedColumns: string[] = ['Name', 'Team', 'Team_name', 'Team_city', 'Position', 'arrest_count'];
  dataSource = new MatTableDataSource<Player>([]);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private playersService: PlayersService
  ) { }

  ngOnInit() {
    this.getPlayers();

    this.dataSource.filterPredicate = function (data, filter: string): boolean {
      return data.Name.toLowerCase().includes(filter);
    };
  }

  private getPlayers() {
    this.showLoading = true;
    this.subscription.add(this.playersService.getTopPlayers().subscribe(
      (resp: any) => {
        this.setUpDataSource(resp);
      },
      error => {
        console.error('CONTROLLER ERROR ' + error.message);
        this.showLoading = false;
      }
    ));
  }

  private setUpDataSource(resp: Player[]) {
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
