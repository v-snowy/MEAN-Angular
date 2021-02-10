import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SummaryAccountEffects } from './effects';
import { featureKey, reducer } from './reducers';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(featureKey, reducer),
    EffectsModule.forFeature([SummaryAccountEffects])
  ]
})
export class SummaryAccountStoreModule {}
