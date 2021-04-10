import { Action } from '@ngrx/store';
import { on } from '@ngrx/store';
import { ActionReducer, createReducer } from '@ngrx/store';
import { initialState, State } from './state';
import * as CategoriesStoreActions from './actions';
import { SaveCategoriesProps } from './actions';
import { categoryEntityAdapter } from './entity/category.entity';

export const featureKey: string = 'categories';

const categoriesReducer: ActionReducer<State> = createReducer(
  initialState,
  on(
    CategoriesStoreActions.loadCategories,
    (state: State): State => ({
      ...state,
      categories: categoryEntityAdapter.removeAll({
        ...state.categories,
        loading: true
      })
    })
  ),
  on(
    CategoriesStoreActions.saveCategories,
    (state: State, { categories }: SaveCategoriesProps): State => ({
      ...state,
      categories: categoryEntityAdapter.addAll(categories, {
        ...state.categories,
        loading: false
      })
    })
  )
);

export function reducer(state: State | undefined, action: Action): any {
  return categoriesReducer(state, action);
}
