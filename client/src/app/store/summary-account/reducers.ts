import { Action } from '@ngrx/store';
import { on } from '@ngrx/store';
import { ActionReducer, createReducer } from '@ngrx/store';
import { initialState, State } from './state';
import * as SummaryAccountStoreActions from './actions';
import { SaveAnalyticsProps, SaveOverviewProps } from './actions';

export const featureKey: string = 'summaryAccount';

const summaryAccountReducer: ActionReducer<State> = createReducer(
  initialState,
  on(
    SummaryAccountStoreActions.loadOverview,
    (state: State): State => ({
      ...state,
      overview: {
        loading: true,
        value: state.overview.value
      }
    })
  ),
  on(
    SummaryAccountStoreActions.saveOverview,
    (state: State, { overview }: SaveOverviewProps): State => ({
      ...state,
      overview: {
        loading: false,
        value: overview
      }
    })
  ),
  on(
    SummaryAccountStoreActions.loadAnalytics,
    (state: State): State => ({
      ...state,
      analytics: {
        loading: true,
        value: state.analytics.value
      }
    })
  ),
  on(
    SummaryAccountStoreActions.saveAnalytics,
    (state: State, { analytics }: SaveAnalyticsProps): State => ({
      ...state,
      analytics: {
        loading: false,
        value: analytics
      }
    })
  )
);

export function reducer(state: State | undefined, action: Action): any {
  return summaryAccountReducer(state, action);
}
