import { Injectable } from '@angular/core';
//import { CookieService } from 'ngx-cookie-service';

interface SavedAccount {
  jwt: string;
  role: string;
}

const USER_KEY = 'authenticated-user';
const USER_ROLE = 'authenticated-user_role';
const USER_PERMISSIONS='authenticated-user_permissions'

@Injectable({
  providedIn: 'root'
})

export class StorageService {

  constructor() { }

  saveAccount(ROLE:String,JWT: String,permissions: any[]): void {
    try {
      const existingUser = window.localStorage.getItem(USER_KEY);
      const existingRole = window.localStorage.getItem(USER_ROLE);
      const existingPermissions = window.localStorage.getItem(USER_PERMISSIONS);
      if (existingUser !== JSON.stringify(JWT) || existingRole !== JSON.stringify(ROLE)|| existingPermissions !== JSON.stringify(permissions)) {
        window.localStorage.setItem(USER_KEY, JSON.stringify(JWT));
        window.localStorage.setItem(USER_ROLE, JSON.stringify(ROLE));
        window.localStorage.setItem(USER_PERMISSIONS, JSON.stringify(permissions));
      }
    } catch (error) {
      console.error('Error while saving account:', error);
    }
  }

  getSavedAccount(): SavedAccount | null {
    try {
      const jwt = window.localStorage.getItem(USER_KEY);
      const role = window.localStorage.getItem(USER_ROLE);

      if (!jwt || !role) {
        return null;
      }

      return { jwt, role };
    } catch (error) {
      console.error('Error while retrieving saved account:', error);
      return null;
    }
  }
  getPermissions(): any[] {
    try {
      const permissionsString = window.localStorage.getItem(USER_PERMISSIONS);
      if (permissionsString) {
        return JSON.parse(permissionsString);
      } else {
        return [];
      }
    } catch (error) {
      console.error('Error while getting permissions:', error);
      return []; 
    }
  }
  

  clean(): void {
    window.localStorage.removeItem(USER_KEY);
    window.localStorage.removeItem(USER_ROLE);
  }
}