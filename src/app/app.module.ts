import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AppRoutingModule} from './/app-routing.module';
import {AuthenticationModule} from "./module/authentication";

import {AppComponent} from './app.component';
import {SignUpComponent} from './auth/sign-up/sign-up.component';
import {SignInComponent} from './auth/sign-in/sign-in.component';
import {AdminListComponent} from './admin/list/list.component';
import {AdminItemComponent} from './admin/item/item.component';
import {AdminAddComponent} from './admin/add/add.component';
import {AdminEditComponent} from './admin/edit/edit.component';

@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    SignInComponent,
    AdminListComponent,
    AdminItemComponent,
    AdminAddComponent,
    AdminEditComponent
  ],
  imports: [
    BrowserModule,
    HttpClient,
    AppRoutingModule,
    AuthenticationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
