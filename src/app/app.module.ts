import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxElectronModule } from 'ngx-electron';
import {FormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { MenuComponent } from './menu/menu.component';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { PosComponent } from './pos/pos.component';
import { CategoriesComponent } from './categories/categories.component';
import { InventoryComponent } from './inventory/inventory.component';
import { UsersComponent } from './users/users.component';
import { SystemComponent } from './system/system.component';
import { DatatableComponent } from './datatable/datatable.component';
import {
  MatTableModule, MatCheckboxModule, MatPaginatorModule, MatSortModule,
  MatFormFieldModule, MatInputModule,  } from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    MenuComponent,
    LoginComponent,
    PosComponent,
    CategoriesComponent,
    InventoryComponent,
    UsersComponent,
    SystemComponent,
    DatatableComponent
  ],
  imports: [
    BrowserModule,
    NgxElectronModule,
    FormsModule,
    AppRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    BrowserAnimationsModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
