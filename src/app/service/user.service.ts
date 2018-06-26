import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs/index';
import {Config} from '../config';

import {AuthService} from "./auth.service";

@Injectable()
export class UserService {

  private userInfo = new Subject<any>();

  constructor(private http: HttpClient,
              private authSvc: AuthService) {
  }

  getUserInfo(id): Observable<any> {
    return this.http.get(Config.prefix.api + '/user/find?id=' + id);
  }

  getUser(): Observable<boolean> {
    return this.userInfo.asObservable();
  }

  get user() {
    return this.getUserInfo(this.authSvc.currentUser).subscribe(res => {
      this.userInfo.next(res);
      return res;
    });
  }

  setUser(user) {
    this.getUserInfo(this.authSvc.currentUser);
    this.userInfo.next(user);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
