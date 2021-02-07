import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesPageComponent } from './categories-page/categories-page.component';
import { CategoryEditComponent } from './categories-page/category-edit/category-edit.component';

const routes: Routes = [
  {
    path: '',
    component: CategoriesPageComponent
  },
  {
    path: 'new',
    component: CategoryEditComponent
  },
  {
    path: ':id',
    component: CategoryEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoriesRoutingModule {}
