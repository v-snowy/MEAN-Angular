import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { HistoryFilterComponent } from './history-page/history-filter/history-filter.component';
import { HistoryListComponent } from './history-page/history-list/history-list.component';
import { HistoryPageComponent } from './history-page/history-page.component';
import { HistoryRoutingModule } from './history-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    HistoryRoutingModule
  ],
  declarations: [
    HistoryPageComponent,
    HistoryFilterComponent,
    HistoryListComponent
  ]
})
export class HistoryModule {}
