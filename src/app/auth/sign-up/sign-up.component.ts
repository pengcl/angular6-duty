import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

import {AuthService} from "../../service/auth.service";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  signUpForm: FormGroup;
  isLoading = false;
  isSubmit = false;


  constructor(private authSvc: AuthService) {
  }


  ngOnInit() {
    this.signUpForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]),
      password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(16)])
    });

    this.signUpForm.get('username').setValue('PengChenlan');
    this.signUpForm.get('password').setValue('zouleyuan');

    this.submit();
  }

  submit() {
    this.authSvc.signUp(this.signUpForm.value).subscribe(res => {
      if (res.success) {
        this.authSvc.updateLoginStatus(res.result)
      }
    })
  };

}
