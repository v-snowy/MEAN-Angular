import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { CategoriesPageComponent } from './categories-page/categories-page.component';
import { CategoryEditComponent } from './categories-page/category-edit/category-edit.component';
import { PositionsComponent } from './categories-page/category-edit/positions/positions.component';
import { CategoriesRoutingModule } from './categories-routing.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    CategoriesRoutingModule
  ],
  declarations: [
    CategoriesPageComponent,
    CategoryEditComponent,
    PositionsComponent
  ]
})
export class CategoriesModule {}
