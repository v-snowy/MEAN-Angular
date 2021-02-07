import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ShellRoutingModule } from './shell-routing.module';
import { ShellComponent } from './shell-page/shell.component';

@NgModule({
  imports: [
    CommonModule,
    ShellRoutingModule
  ],
  declarations: [ShellComponent]
})
export class ShellModule {}
