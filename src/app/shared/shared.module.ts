import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgressSpinnerComponent } from './components/progress-spinner/progress-spinner.component';

import { MatProgressSpinnerModule, MatToolbarModule } from '@angular/material';
import { MenuComponent } from './components/menu/menu.component';

const Components = [
  ProgressSpinnerComponent,
  MenuComponent
];

const Modules = [
  CommonModule,
  MatProgressSpinnerModule,
  MatToolbarModule
];

@NgModule({
  declarations: [...Components],
  imports: [...Modules],
  exports: [...Components]
})
export class SharedModule { }
