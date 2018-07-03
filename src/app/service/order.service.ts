import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs/index';
import {Config} from '../config';

@Injectable()
export class OrderService {

  private orders = new Subject<any[]>();

  set(orders) {
    this.orders.next(orders);
  }

  get(): Observable<any[]> {
    return this.orders.asObservable();
  }

  constructor(private http: HttpClient) {
  }

  find(): Observable<any> {

    return this.http.get(Config.prefix.api + '/order/find');
  }

  findById(id): Observable<any> {

    return this.http.get(Config.prefix.api + '/order/find?id=' + id);
  }

  findByOwner(uid): Observable<any> {

    return this.http.get(Config.prefix.api + '/order/find?uid=' + uid);
  }

  submit(body): Observable<any> {

    return this.http.post(Config.prefix.api + '/order/submit', body);
  }

  setStatus(body): Observable<any> {
    return this.http.post(Config.prefix.api + '/order/setStatus', body);
  }


  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
