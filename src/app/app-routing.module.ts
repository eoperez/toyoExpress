import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PosComponent } from './pos/pos.component';
import { CategoriesComponent } from './categories/categories.component';
import { InventoryComponent } from './inventory/inventory.component';
import { UsersComponent } from './users/users.component';
import { SystemComponent } from './system/system.component';

const routes: Routes = [
  { path: 'pos', component: PosComponent },
  { path: 'categories', component: CategoriesComponent },
  { path: 'inventory', component: InventoryComponent },
  { path: 'users', component: UsersComponent},
  { path: 'system', component: SystemComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes)],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
