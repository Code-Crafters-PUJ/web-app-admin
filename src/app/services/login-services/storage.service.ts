import { Injectable } from '@angular/core';
//import { CookieService } from 'ngx-cookie-service';
import { Account } from '../../models/login-models/account';

const USER_KEY = 'authenticated-user';

@Injectable({
  providedIn: 'root'
})

export class StorageService {

  constructor() { }

  saveAccount(account : Account){
    window.localStorage.removeItem(USER_KEY);
    window.localStorage.setItem(USER_KEY, JSON.stringify(account));
  }

  getSavedAccount() : Account | null {
    const user = window.localStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }
    return null;
  }

  clean(): void {
    window.localStorage.clear();
  }
}
