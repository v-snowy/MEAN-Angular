import { Injectable } from '@angular/core';
import { Actions, createEffect, CreateEffectMetadata, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import * as CategoriesStoreActions from './actions';
import { Category } from 'src/app/shared/interfaces';
import { Action } from '@ngrx/store';
import { CategoriesService } from 'src/app/shared/services/categories.service';

@Injectable()
export class CategoriesEffects {

  readonly loadCategories$: Observable<Action> & CreateEffectMetadata = createEffect(() => {
    return this.actions$.pipe(
      ofType(CategoriesStoreActions.loadCategories),
      switchMap((): Observable<Action> => {
        return this.categoriesService.getAllCategories()
          .pipe(
            catchError(() => of([])),
            map(
              (categories: Category[]) => CategoriesStoreActions.saveCategories({ categories })
            )
          );
      })
    );
  });

  constructor(
    private readonly actions$: Actions,
    private readonly categoriesService: CategoriesService
  ) {
  }
}
