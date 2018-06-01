import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {PublicGuard, ProtectedGuard} from "ngx-auth";

import {SignInComponent} from "./auth/sign-in/sign-in.component";
import {SignUpComponent} from "./auth/sign-up/sign-up.component";
import {AdminListComponent} from "./admin/list/list.component";
import {AdminItemComponent} from "./admin/item/item.component";
import {AdminAddComponent} from "./admin/add/add.component";
import {AdminEditComponent} from "./admin/edit/edit.component";

const routes: Routes = [
  {path: '', redirectTo: '/auth/signIn', pathMatch: 'full'},
  {path: 'auth/signIn', component: SignInComponent, canActivate: [PublicGuard], data: {}},
  {path: 'auth/signUp', component: SignUpComponent, canActivate: [PublicGuard], data: {}},
  {path: 'admin/list', component: AdminListComponent, canActivate: [ProtectedGuard], data: {}},
  {path: 'admin/item', component: AdminItemComponent, canActivate: [ProtectedGuard], data: {}},
  {path: 'admin/add', component: AdminAddComponent, canActivate: [ProtectedGuard], data: {}},
  {path: 'admin/edit', component: AdminEditComponent, canActivate: [ProtectedGuard], data: {}},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule {
}
