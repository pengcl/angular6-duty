import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../service/auth.service";
import {OrderService} from "../../service/order.service";

@Component({
  selector: 'app-admin-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class AdminListComponent implements OnInit {
  user;
  orders;

  constructor(private authSvc: AuthService,
              private orderSvc: OrderService) {
  }

  ngOnInit() {
    this.user = this.authSvc.currentUser;
    this.orderSvc.findByOwner(this.user).subscribe(res => {
      this.orders = res;
    })
  }

}
