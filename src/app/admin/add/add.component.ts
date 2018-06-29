import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

import {Config} from '../../config';
import {Uploader, UploaderOptions} from 'ngx-weui';
import {AuthService} from '../../service/auth.service';
import {MenuService} from "../../service/menu.service";
import {OrderService} from '../../service/order.service';

@Component({
  selector: 'app-admin-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AdminAddComponent implements OnInit {

  user;
  orders;
  orderForm: FormGroup;
  loading = false;
  isSubmit = false;

  license: Uploader = new Uploader(<UploaderOptions>{
    url: Config.prefix.api + '/uploader/upload',
    headers: [],
    auto: true,
    onUploadSuccess: (a, b) => {
      this.orderForm.get('company.license').setValue(b);
    }
  });


  passportA: Uploader = new Uploader(<UploaderOptions>{
    url: Config.prefix.api + '/uploader/upload',
    headers: [],
    auto: true,
    onUploadSuccess: (a, b) => {
      this.orderForm.get('company.legal.passport.A').setValue(b);
    }
  });

  passportB: Uploader = new Uploader(<UploaderOptions>{
    url: Config.prefix.api + '/uploader/upload',
    headers: [],
    auto: true,
    onUploadSuccess: (a, b) => {
      this.orderForm.get('company.legal.passport.B').setValue(b);
    }
  });

  manuscript: Uploader = new Uploader(<UploaderOptions>{
    url: Config.prefix.api + '/uploader/upload',
    headers: [],
    auto: true,
    onUploadSuccess: (a, b) => {
      this.orderForm.get('exhibition.manuscript').setValue(b);
    }
  });

  bill: Uploader = new Uploader(<UploaderOptions>{
    url: Config.prefix.api + '/uploader/upload',
    headers: [],
    auto: true,
    onUploadSuccess: (a, b) => {
      this.orderForm.get('exhibition.bill').setValue(b);
    }
  });

  constructor(private menuSvc: MenuService,
              private authSvc: AuthService,
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

    this.orderForm = new FormGroup({
      uid: new FormControl('', [Validators.required]),
      company: new FormGroup({
        name: new FormControl('', [Validators.required]),
        address: new FormControl('', [Validators.required]),
        license: new FormControl('', [Validators.required]),
        legal: new FormGroup({
          passport: new FormGroup({
            A: new FormControl('', [Validators.required]),
            B: new FormControl('', [Validators.required])
          })
        })
      }),
      contact: new FormGroup({
        name: new FormControl('', [Validators.required]),
        tel: new FormControl('', []),
        mobile: new FormControl('', [Validators.required])
      }),
      exhibition: new FormGroup({
        name: new FormControl('', [Validators.required]),
        company: new FormControl('', [Validators.required]),
        no: new FormControl('', [Validators.required]),
        manuscript: new FormControl('', [Validators.required]),
        contract: new FormControl('', [Validators.required]),
        bill: new FormControl('', [Validators.required]),
        startAt: new FormControl('', [Validators.required]),
        buildAt: new FormControl('', [Validators.required])
      }),
      account: new FormGroup({
        type: new FormControl('', [Validators.required]),
        name: new FormControl('', [Validators.required]),
        no: new FormControl('', [Validators.required]),
      })
    });

    this.orderForm.get('uid').setValue(this.user);
  }

  submit() {
    this.isSubmit = true;
    if (this.orderForm.invalid) {
      return false;
    }

    this.orderSvc.submit(this.orderForm.value).subscribe(res => {
      console.log(res);
    });
  }

  menu() {
    this.menuSvc.set(true);
  }

}
