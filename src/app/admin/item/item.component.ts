import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

import {Config} from "../../config";
import {AuthService} from "../../service/auth.service";
import {MenuService} from "../../service/menu.service";
import {OrderService} from "../../service/order.service";

@Component({
  selector: 'app-admin-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class AdminItemComponent implements OnInit {

  config = Config;

  user;
  orders;
  id;
  order;

  constructor(private route: ActivatedRoute,
              private authSvc: AuthService,
              private menuSvc: MenuService,
              private orderSvc: OrderService) {
  }

  ngOnInit() {
    this.user = this.authSvc.currentUser;
    if (this.user.admin) {
      this.orderSvc.find().subscribe(res => {
        this.orders = res;
        this.orderSvc.set(res);
      })
    } else {
      this.orderSvc.findByOwner(this.user.id).subscribe(res => {
        this.orders = res;
        this.orderSvc.set(res);
      })
    }
    this.id = this.route.snapshot.params['id'];
    this.orderSvc.findById(this.id).subscribe(res => {
      this.order = res;
    })
  }

  menu() {
    this.menuSvc.set(true);
  }
}
