import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'overview',
    loadChildren: () => import('../../../overview/overview.module').then(m => m.OverviewModule)
  },
  {
    path: 'analytics',
    loadChildren: () => import('../../../analytics/analytics.module').then(m => m.AnalyticsModule)
  },
  {
    path: 'history',
    loadChildren: () => import('../../../history/history.module').then(m => m.HistoryModule)
  },
  {
    path: 'order',
    loadChildren: () => import('../../../order/order.module').then(m => m.OrderModule)
  },
  {
    path: 'categories',
    loadChildren: () => import('../../../categories/categories.module').then(m => m.CategoriesModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShellRoutingModule {}
