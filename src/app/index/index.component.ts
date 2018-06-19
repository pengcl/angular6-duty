import {Component, OnInit} from '@angular/core';
import {OrderService} from "../service/order.service";

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html'
})
export class IndexComponent implements OnInit {

  constructor(private orderSvc: OrderService) {
  }

  ngOnInit() {
    this.orderSvc.find().subscribe(res=>{
      console.log(res);
    })
  }

}
