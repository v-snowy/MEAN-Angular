import { ActionCreator, createAction, props } from '@ngrx/store';
import { TypedAction } from '@ngrx/store/src/models';
import { Category } from 'src/app/shared/interfaces';

export interface SaveCategoriesProps {
  categories: Category[];
}

export const loadCategories:
  ActionCreator<string, () => TypedAction<string>> =
  createAction('[Categories Store] Load Categories');

export const saveCategories:
  ActionCreator<string, (props: SaveCategoriesProps) =>
    SaveCategoriesProps & TypedAction<string>> =
  createAction(
    '[Categories Store] Save Categories',
    props<SaveCategoriesProps>()
  );
