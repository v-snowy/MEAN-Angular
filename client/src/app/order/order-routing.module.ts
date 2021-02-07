import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderCategoriesComponent } from './order-page/order-categories/order-categories.component';
import { OrderPageComponent } from './order-page/order-page.component';
import { OrderPositionsComponent } from './order-page/order-positions/order-positions.component';

const routes: Routes = [
  {
    path: '',
    component: OrderPageComponent,
    children: [
      { path: '', component: OrderCategoriesComponent },
      { path: ':id', component: OrderPositionsComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderRoutingModule {}
