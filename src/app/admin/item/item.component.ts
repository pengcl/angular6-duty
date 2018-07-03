import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {Config} from '../../config';
import {DialogService} from 'ngx-weui';
import {AuthService} from '../../service/auth.service';
import {MenuService} from '../../service/menu.service';
import {OrderService} from '../../service/order.service';

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

  constructor(private router: Router,
              private route: ActivatedRoute,
              private dialogSvc: DialogService,
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
      });
    } else {
      this.orderSvc.findByOwner(this.user.id).subscribe(res => {
        this.orders = res;
        this.orderSvc.set(res);
      });
    }
    this.id = this.route.snapshot.params['id'];
    this.orderSvc.findById(this.id).subscribe(res => {
      this.order = res;
    });
  }

  menu() {
    this.menuSvc.set(true);
  }

  resolve() {
    this.orderSvc.setStatus({id: this.id, status: 1}).subscribe(res => {
      this.dialogSvc.show({content: '操作成功！', cancel: '', confirm: '我知道了'}).subscribe((data) => {
        if (data.value) {
          this.router.navigate(['/admin/list']);
        }
      });
    });
  }

  reject() {
    this.orderSvc.setStatus({id: this.id, status: 3}).subscribe(res => {
      this.dialogSvc.show({content: '操作成功！', cancel: '', confirm: '我知道了'}).subscribe((data) => {
        if (data.value) {
          this.router.navigate(['/admin/list']);
        }
      });
    });
  }
}
