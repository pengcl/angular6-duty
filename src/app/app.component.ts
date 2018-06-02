import {Component} from '@angular/core';

import {AuthService} from "./service/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private authSvc: AuthService) {
    this.authSvc.getLoginStatus().subscribe(res => {
      console.log(res);
    })
  }
}
