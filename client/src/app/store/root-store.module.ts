import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { CategoriesStoreModule } from './categories';
import { SummaryAccountStoreModule } from './summary-account';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    SummaryAccountStoreModule,
    CategoriesStoreModule
  ]
})
export class RootStoreModule {}
