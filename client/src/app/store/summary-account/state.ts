import { AnalyticsModel, OverviewModel } from 'src/app/shared/interfaces';
import { LoadingValue } from '../shared/loading-value';

export interface State {
  overview: LoadingValue<OverviewModel>;
  analytics: LoadingValue<AnalyticsModel>;
}

export const initialState: State = {
  overview: {
    loading: false,
    value: null
  },
  analytics: {
    loading: false,
    value: null
  }
}
