import { createSelector } from '@ngrx/store';
import { createFeatureSelector } from '@ngrx/store';
import { MemoizedSelector } from '@ngrx/store';
import { Category } from 'src/app/shared/interfaces';
import { LoadingArray } from '../shared/loading-array';
import { LoadingEntityState } from '../shared/loading-entity-state';
import { categoryEntityAdapter } from './entity/category.entity';
import { featureKey } from './reducers';
import { State } from './state';

export const getCategories: (state: State) => LoadingArray<Category> =
  (state: State) => {
    const categories: LoadingEntityState<Category> = state.categories;

    return {
      loading: categories.loading,
      array: categoryEntityAdapter.getSelectors().selectAll(categories)
    }
  };

export const categoriesFeatureStateSelector: MemoizedSelector<object, State> =
  createFeatureSelector(
    featureKey
  );

export const categoriesStateSelector: MemoizedSelector<object, LoadingArray<Category>> =
  createSelector(
    categoriesFeatureStateSelector,
    getCategories
  );
