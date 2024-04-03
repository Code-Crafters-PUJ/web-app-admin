import { Injectable } from '@angular/core';
//import { CookieService } from 'ngx-cookie-service';
import { Account } from '../../models/login-models/account';

const USER_KEY = 'authenticated-user';

@Injectable({
  providedIn: 'root'
})

export class StorageService {

  constructor() { }

  saveAccount(account: Account): void {
    try {
      const existingUser = window.localStorage.getItem(USER_KEY);
      if (existingUser !== JSON.stringify(account)) {
        window.localStorage.setItem(USER_KEY, JSON.stringify(account));
      }
    } catch (error) {
      console.error('Error while saving account:', error);
    }
  }

  getSavedAccount(): Account | null {
    try {

      if (window.localStorage.getItem(USER_KEY)?.length === 0 || window.localStorage.getItem(USER_KEY) === "undefined" || window.localStorage.getItem(USER_KEY) === "null"){
        return null;

      }else{
        const user = window.localStorage.getItem(USER_KEY);
        if (user) {
          return JSON.parse(user);
        }
      }
      return null;
    } catch (error) {
      console.error('Error while retrieving saved account:', error);
      return null;
    }
  }




  clean(): void {
    window.localStorage.removeItem(USER_KEY);
  }
}
