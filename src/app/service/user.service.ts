import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs/index';
import {Config} from '../config';

import {AuthService} from "./auth.service";

@Injectable()
export class UserService {

  constructor(private http: HttpClient,
              private authSvc: AuthService) {
  }

  getUser(id): Observable<any> {
    return this.http.get(Config.prefix.api + '/user/find?id=' + id);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
