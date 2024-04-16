import { Account } from "./account";
import { Module } from "./Module";

export interface Permission {
    account:Account
    module:Module
    operation:Operation
}

enum Operation {
    Modify = 'Modify',
    View = 'View'
  }
  
