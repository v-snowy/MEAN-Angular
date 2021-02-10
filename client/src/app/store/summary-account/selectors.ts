import { createSelector } from '@ngrx/store';
import { createFeatureSelector } from '@ngrx/store';
import { MemoizedSelector } from '@ngrx/store';
import { AnalyticsModel, OverviewModel } from 'src/app/shared/interfaces';
import { LoadingValue } from '../shared/loading-value';
import { featureKey } from './reducers';
import { State } from './state';

export const getOverview: (state: State) => LoadingValue<OverviewModel> =
  (state: State) => state.overview;

export const getAnalytics: (state: State) => LoadingValue<AnalyticsModel> =
  (state: State) => state.analytics;

export const summaryAccountStateSelector: MemoizedSelector<object, State> =
  createFeatureSelector(
    featureKey
  );

export const overviewStateSelector: MemoizedSelector<object, LoadingValue<OverviewModel>> =
  createSelector(
    summaryAccountStateSelector,
    getOverview
  );

export const analyticsStateSelector: MemoizedSelector<object, LoadingValue<AnalyticsModel>> =
  createSelector(
    summaryAccountStateSelector,
    getAnalytics
  );
