import {Component} from '@angular/core';

import {AuthService} from './service/auth.service';
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
  orders;

  constructor(private authSvc: AuthService,
              private userSvc: UserService,
              private orderSvc: OrderService) {
    this.authSvc.getLoginStatus().subscribe(res => {
      this.isLogin = res;
    });

    this.userSvc.getUser().subscribe(userInfo => {
      this.userInfo = userInfo;
      console.log(this.userInfo);
    });

    this.orderSvc.get().subscribe(res => {
      // status: Number, // 0:审核中|1:审核通过|2:已完成|3:已拒绝
      const orders = {
        resolving: [],
        resolved: [],
        finished: [],
        rejected: []
      };
      res.forEach(item => {
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
}
