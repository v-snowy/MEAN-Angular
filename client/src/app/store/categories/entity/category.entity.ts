import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { Category } from 'src/app/shared/interfaces';

function selectCategoryName(item: Category): string {
  return item.name;
}

export const categoryEntityAdapter: EntityAdapter<Category> =
  createEntityAdapter({
    selectId: selectCategoryName,
    sortComparer: false
  });
