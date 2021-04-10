import { EntityState } from '@ngrx/entity';

export interface LoadingEntityState<T> extends EntityState<T> {
  loading: boolean;
}
