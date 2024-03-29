import { Component } from '@angular/core';
import { Account } from '../../../../models/account';

@Component({
  selector: 'app-table-accounts',
  standalone: true,
  imports: [],
  templateUrl: './table-accounts.component.html',
  styleUrl: './table-accounts.component.css',
})
export class TableAccountsComponent {
  accounts: Account[] = [
    new Account('John', 'Doe', 123456789, ['admin'], new Date(), new Date()),
    new Account('Jane', 'Doe', 987654321, ['user'], new Date(), new Date()),
  ];
  selectedEditAccount: Account | null = null;

  constructor() {}

  setSelectedEditAccount(optionalAccount: Account): void {
    if (this.selectedEditAccount === optionalAccount) {
      this.selectedEditAccount = null;
      return;
    }
    this.selectedEditAccount = optionalAccount;
  }
}
