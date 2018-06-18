import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';

import {AuthService} from '../../service/auth.service';
import {StorageService} from '../../service/base/storage.service';
import {DialogService} from 'ngx-weui';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  signUpForm: FormGroup;
  isLoading = false;
  isSubmit = false;


  constructor(private router: Router,
              private authSvc: AuthService,
              private storageSvc: StorageService,
              private dialogSvc: DialogService) {
  }


  ngOnInit() {
    this.signUpForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]),
      password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(16)]),
      confirmPassword: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(16)])
    });
  }

  submit() {
    if (this.isLoading) {
      return false;
    }
    this.isLoading = true;
    this.authSvc.signUp(this.signUpForm.value).subscribe(res => {
      this.isLoading = false;
      if (res.success) {
        this.authSvc.updateLoginStatus(res.result);
        this.router.navigate(['/admin/list']);
      } else {
        this.dialogSvc.show({content: res.msg, confirm: '我知道了', cancel: ''}).subscribe();
      }
    });
  }

}
