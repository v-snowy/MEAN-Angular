import { Injectable } from '@angular/core';
import { Actions, createEffect, CreateEffectMetadata, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import * as SummaryAccountStoreActions from './actions';
import { AnalyticsModel, OverviewModel } from 'src/app/shared/interfaces';
import { SummaryAccountService } from 'src/app/shared/services/summary-account.service';
import { Action } from '@ngrx/store';

@Injectable()
export class SummaryAccountEffects {

  readonly loadOverview$: Observable<Action> & CreateEffectMetadata = createEffect(() => {
    return this.actions$.pipe(
      ofType(SummaryAccountStoreActions.loadOverview),
      switchMap((): Observable<Action> => {
        return this.summaryAccountService.getOverview()
          .pipe(
            catchError(() => of(null)),
            map(
              (overview: OverviewModel | null) => SummaryAccountStoreActions.saveOverview({ overview })
            )
          );
      })
    );
  });

  readonly loadAnalytics$: Observable<Action> & CreateEffectMetadata = createEffect(() => {
    return this.actions$.pipe(
      ofType(SummaryAccountStoreActions.loadAnalytics),
      switchMap((): Observable<Action> => {
        return this.summaryAccountService.getAnalytics()
          .pipe(
            catchError(() => of(null)),
            map(
              (analytics: AnalyticsModel | null) => SummaryAccountStoreActions.saveAnalytics({ analytics })
            )
          );
      })
    );
  });

  constructor(
    private readonly actions$: Actions,
    private readonly summaryAccountService: SummaryAccountService
  ) {
  }
}
