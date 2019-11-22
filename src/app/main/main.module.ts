import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrimesComponent } from './components/crimes/crimes.component';
import { SharedModule } from '../shared/shared.module';

import { RouterModule, Routes } from '@angular/router';
import { PlayersComponent } from './components/players/players.component';
import { TeamsComponent } from './components/teams/teams.component';

import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import {
  MatTableModule, MatPaginatorModule,
  MatInputModule,
} from '@angular/material';

export const ROUTES: Routes = [
  {
    path: '',
    component: CrimesComponent,
  },
  {
    path: 'crimes',
    component: CrimesComponent
  },
  {
    path: 'teams',
    component: TeamsComponent
  },
  {
    path: 'players',
    component: PlayersComponent
  }
];

const Components = [
  CrimesComponent,
  PlayersComponent,
  TeamsComponent
];

const Modules = [
  CommonModule,
  RouterModule.forChild(ROUTES),
  SharedModule,
  MatTableModule,
  MatPaginatorModule,
  MatInputModule,
  ReactiveFormsModule,
  FormsModule
];

@NgModule({
  declarations: [...Components],
  imports: [...Modules],
  exports: [...Components]
})
export class MainModule { }
