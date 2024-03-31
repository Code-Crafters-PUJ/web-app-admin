import { Component } from '@angular/core';
import { Account } from '../../../../models/general-models/account';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import { AccountService } from '../../../../services/general-services/account/account.service';
<<<<<<< HEAD
import {NgOptimizedImage} from "@angular/common";
=======
import { CommonModule } from '@angular/common';
>>>>>>> cb827b244a9fc1c1a9fd6f5b159a029a145c34a1

@Component({
  selector: 'app-table-accounts',
  standalone: true,
<<<<<<< HEAD
  imports: [
    RouterLink,
    NgOptimizedImage
  ],
=======
  imports: [CommonModule],
>>>>>>> cb827b244a9fc1c1a9fd6f5b159a029a145c34a1
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
