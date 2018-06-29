import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AuthService} from "../../service/auth.service";
import {MenuService} from "../../service/menu.service";
import {OrderService} from "../../service/order.service";

@Component({
  selector: 'app-admin-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class AdminListComponent implements OnInit {
  user;
  orders;
  status;

  constructor(private route: ActivatedRoute,
              private authSvc: AuthService,
              private menuSvc: MenuService,
              private orderSvc: OrderService) {
  }

  ngOnInit() {
    this.user = this.authSvc.currentUser;

    this.route.queryParamMap.subscribe(queryParam => {
      this.status = queryParam.get('status');

      if (this.user.admin) {
        this.orderSvc.find().subscribe(res => {
          let orders = [];
          if (this.status === null) {
            orders = res;
          } else {
            res.forEach(item => {
              if (item.status + '' === this.status) {
                orders.push(item);
              }
            });
          }
          this.orders = orders;
          this.orderSvc.set(res);
        })
      } else {
        this.orderSvc.findByOwner(this.user.id).subscribe(res => {
          let orders = [];
          if (this.status === null) {
            orders = res;
          } else {
            res.forEach(item => {
              if (item.status + '' === this.status) {
                orders.push(item);
              }
            });
          }
          this.orders = orders;
          this.orderSvc.set(res);
        })
      }
    });
  }

  menu() {
    this.menuSvc.set(true);
  }

}
