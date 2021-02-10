import { Injectable } from '@angular/core';
import { select } from '@ngrx/store';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { RootStoreState } from 'src/app/store';
import { LoadingValue } from 'src/app/store/shared/loading-value';
import { AnalyticsModel, OverviewModel } from '../interfaces';
import * as SummaryAccountStoreSelectors from '../../store/summary-account/selectors';
import * as SummaryAccountStoreActions from '../../store/summary-account/actions';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SummaryAccountService {

  get overview$(): Observable<LoadingValue<OverviewModel>> {
    return this.store$.pipe(
      select(SummaryAccountStoreSelectors.overviewStateSelector)
    );
  }

  get analytics$(): Observable<LoadingValue<AnalyticsModel>> {
    return this.store$.pipe(
      select(SummaryAccountStoreSelectors.analyticsStateSelector)
    );
  }

  constructor(
    private readonly store$: Store<RootStoreState.State>,
    private http: HttpClient
  ) {
  }

  getOverview(): Observable<OverviewModel> {
    return this.http.get<OverviewModel>('/api/analytics/overview');
  }

  getAnalytics(): Observable<AnalyticsModel> {
    return this.http.get<AnalyticsModel>('/api/analytics/analytics');
  }

  loadOverview(): void {
    this.store$.dispatch(SummaryAccountStoreActions.loadOverview());
  }

  loadAnalytics(): void {
    this.store$.dispatch(SummaryAccountStoreActions.loadAnalytics());
  }
}
