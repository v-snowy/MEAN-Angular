import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { AnalyticsPageComponent } from './analytics-page/analytics-page.component';
import { AnalyticsRoutingModule } from './analytics.module-routing.module';

@NgModule({
  declarations: [
    AnalyticsPageComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AnalyticsRoutingModule
  ]
})
export class AnalyticsModule {}
