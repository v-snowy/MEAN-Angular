import { ActionCreator, createAction, props } from '@ngrx/store';
import { TypedAction } from '@ngrx/store/src/models';
import { AnalyticsModel, OverviewModel } from 'src/app/shared/interfaces';

export interface SaveOverviewProps {
  overview: OverviewModel;
}

export interface SaveAnalyticsProps {
  analytics: AnalyticsModel;
}

export const loadOverview:
  ActionCreator<string, () => TypedAction<string>> =
  createAction('[Overview Store] Load Overview');

export const saveOverview:
  ActionCreator<string, (props: SaveOverviewProps) => SaveOverviewProps & TypedAction<string>> =
  createAction(
    '[Overview Store] Save Overview',
    props<SaveOverviewProps>()
  );

export const loadAnalytics:
  ActionCreator<string, () => TypedAction<string>> =
  createAction('[Overview Store] Load Analytics');

export const saveAnalytics:
  ActionCreator<string, (props: SaveAnalyticsProps) => SaveAnalyticsProps & TypedAction<string>> =
  createAction(
    '[Overview Store] Save Analytics',
    props<SaveAnalyticsProps>()
  );
