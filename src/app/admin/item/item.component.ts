import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

import {Config} from "../../config";
import {AuthService} from "../../service/auth.service";
import {OrderService} from "../../service/order.service";

@Component({
  selector: 'app-admin-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class AdminItemComponent implements OnInit {

  config = Config;
  id;
  order;

  constructor(private route: ActivatedRoute,
              private authSvc: AuthService,
              private orderSvc: OrderService) {
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    console.log(this.id);
    this.orderSvc.findById(this.id).subscribe(res => {
      console.log(res);
      this.order = res;
    })
  }

}
