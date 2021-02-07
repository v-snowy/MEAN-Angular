import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { OverviewPageComponent } from './overview-page/overview-page.component';
import { OverviewRoutingModule } from './overview-routing.module';

@NgModule({
  declarations: [
    OverviewPageComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    OverviewRoutingModule
  ]
})
export class OverviewModule {}
