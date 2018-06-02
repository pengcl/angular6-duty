import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {AppRoutingModule} from './/app-routing.module';

import {JwtModule} from "@auth0/angular-jwt";

export function tokenGetter() {
  console.log(Config.prefix.api + '/auth');
  return localStorage.getItem('access_token');
}

//components
import {AppComponent} from './app.component';
import {SignUpComponent} from './auth/sign-up/sign-up.component';
import {SignInComponent} from './auth/sign-in/sign-in.component';
import {AdminListComponent} from './admin/list/list.component';
import {AdminItemComponent} from './admin/item/item.component';
import {AdminAddComponent} from './admin/add/add.component';
import {AdminEditComponent} from './admin/edit/edit.component';

//services
import {SERVICES_DECLARATIONS} from "./service";

import {Config} from "./config";

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
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: [Config.domain],
        blacklistedRoutes: ['/api/auth/signIn']
      }
    })
  ],
  providers: [
    ...SERVICES_DECLARATIONS
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
