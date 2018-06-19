import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './_guards/auth';

/*import {PublicGuard, ProtectedGuard} from "ngx-auth";*/

import {IndexComponent} from "./index/index.component";
import {SignInComponent} from './auth/sign-in/sign-in.component';
import {SignUpComponent} from './auth/sign-up/sign-up.component';
import {AdminListComponent} from './admin/list/list.component';
import {AdminItemComponent} from './admin/item/item.component';
import {AdminAddComponent} from './admin/add/add.component';
import {AdminEditComponent} from './admin/edit/edit.component';

const routes: Routes = [
  {path: '', redirectTo: 'admin/list', pathMatch: 'full'},
  {path: 'index', component: IndexComponent},
  {path: 'auth/signIn', component: SignInComponent},
  {path: 'auth/signUp', component: SignUpComponent},
  {path: 'admin/list', component: AdminListComponent, canActivate: [AuthGuard], data: {title: 'Customers'}},
  {path: 'admin/item/:id', component: AdminItemComponent, canActivate: [AuthGuard], data: {title: 'Customers'}},
  {path: 'admin/add', component: AdminAddComponent, canActivate: [AuthGuard], data: {title: 'Customers'}},
  {path: 'admin/edit/:id', component: AdminEditComponent, canActivate: [AuthGuard], data: {title: 'Customers'}},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  providers: [
    AuthGuard
  ],
  declarations: []
})
export class AppRoutingModule {
}
