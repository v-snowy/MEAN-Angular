import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './shared/layouts/auth/auth-page/auth.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { ShellComponent } from './shared/layouts/shell/shell-page/shell.component';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    loadChildren: () => import('./shared/layouts/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: '',
    component: ShellComponent,
    loadChildren: () => import('./shared/layouts/shell/shell.module').then(m => m.ShellModule),
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {
}
