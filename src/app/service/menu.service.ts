import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs/index';

@Injectable()
export class MenuService {

  private menuOpen = new Subject<boolean>();

  set(menuOpen) {
    this.menuOpen.next(menuOpen)
  }

  get(): Observable<boolean> {
    return this.menuOpen.asObservable();
  }

  constructor() {
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
