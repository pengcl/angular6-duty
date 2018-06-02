import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../service/auth.service";

import {interval as observableInterval} from 'rxjs/index';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  signInForm: FormGroup;
  isLoading = false;
  isSubmit = false;

  timer;
  timers;

  constructor(private authSvc: AuthService) {
  }


  ngOnInit() {
    this.signInForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]),
      password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(16)])
    });

    this.signInForm.get('username').setValue('PengChenlan');
    this.signInForm.get('password').setValue('zouleyuan');

    this.submit();
  }

  submit() {
    this.authSvc.signIn(this.signInForm.value).subscribe(res => {
      if (res.success) {
        this.authSvc.updateLoginStatus(res.result)
      }
    })
  };
}
