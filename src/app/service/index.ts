import {StorageService} from './base/storage.service';
import {AuthService} from './auth.service';
import {UserService} from "./user.service";
import {OrderService} from './order.service';

export const SERVICES_DECLARATIONS = [
  StorageService,
  AuthService,
  UserService,
  OrderService
];
