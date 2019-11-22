import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrimesComponent } from './components/crimes/crimes.component';

import { RouterModule, Routes } from '@angular/router';

export const ROUTES: Routes = [
  {
    path: '',
    component: CrimesComponent
  }
];

const Components = [
  CrimesComponent
];

const Modules = [
  CommonModule,
  RouterModule.forChild(ROUTES)
];

@NgModule({
  declarations: [...Components],
  imports: [...Modules],
  exports: [...Components]
})
export class MainModule { }
