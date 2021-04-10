import { Category } from 'src/app/shared/interfaces';
import { LoadingEntityState } from '../shared/loading-entity-state';
import { categoryEntityAdapter } from './entity/category.entity';

export interface State {
  categories: LoadingEntityState<Category>;
}

export const initialState: State = {
  categories: categoryEntityAdapter.getInitialState({
    loading: false
  })
}
