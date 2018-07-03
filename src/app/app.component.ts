import {Component} from '@angular/core';
import {Router} from '@angular/router';

import {StorageService} from './service/base/storage.service';
import {AuthService} from './service/auth.service';
import {MenuService} from './service/menu.service';
import {UserService} from './service/user.service';
import {OrderService} from './service/order.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isLogin = false;
  userInfo;
  menuOpen;
  orders;

  constructor(private router: Router,
              private storageSvc: StorageService,
              private authSvc: AuthService,
              private menuSvc: MenuService,
              private userSvc: UserService,
              private orderSvc: OrderService) {
    this.authSvc.getLoginStatus().subscribe(res => {
      this.isLogin = res;
      if (this.isLogin && !this.userInfo) {
        this.userSvc.getUser(JSON.parse(this.storageSvc.get('user')).id).subscribe(user => {
          console.log(user);
          this.userInfo = user;
        });
      }
    });

    this.menuSvc.get().subscribe(res => {
      this.menuOpen = res;
    });

    this.orderSvc.get().subscribe(res => {
      // status: Number, // 0:审核中|1:审核通过|2:已完成|3:已拒绝
      const orders = {
        all: [],
        resolving: [],
        resolved: [],
        finished: [],
        rejected: []
      };
      res.forEach(item => {
        orders.all.push(item);
        if (item.status === 0) {
          orders.resolving.push(item);
        }
        if (item.status === 1) {
          orders.resolved.push(item);
        }
        if (item.status === 2) {
          orders.finished.push(item);
        }
        if (item.status === 3) {
          orders.rejected.push(item);
        }
      });
      this.orders = orders;
    });
  }

  logout() {
    this.storageSvc.clear();
    window.location.href = '/auth/signIn';
  }

  menu() {
    this.menuSvc.set(false);
  }
}
