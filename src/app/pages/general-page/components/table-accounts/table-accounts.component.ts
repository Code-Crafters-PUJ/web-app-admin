import { Component } from '@angular/core';
import { Account } from '../../../../models/general-models/account';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '../../../../services/general-services/account/account.service';

@Component({
  selector: 'app-table-accounts',
  standalone: true,
  imports: [],
  templateUrl: './table-accounts.component.html',
  styleUrl: './table-accounts.component.css',
})
export class TableAccountsComponent {
  accounts: Account[] = [
  ];
  selectedEditAccount: Account | null = null;

  constructor(
    private accountService: AccountService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
   
        this.getAccounts();
    };
  private getAccounts() {
    this.accountService.getAccounts().subscribe(
      data => {
        this.accounts = data;
      },
      error => {
        console.error('Error al obtener usuarios:', error);
      }
    );
  }

  setSelectedEditAccount(optionalAccount: Account): void {
    if (this.selectedEditAccount === optionalAccount) {
      this.selectedEditAccount = null;
      return;
    }
    this.selectedEditAccount = optionalAccount;
  }
}
