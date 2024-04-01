import { Component } from '@angular/core';
import { Account } from '../../../../models/general-models/account';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '../../../../services/general-services/account/account.service';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-general-information',
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: './general-information.component.html',
  styleUrl: './general-information.component.css'
})
export class GeneralInformationComponent {
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

}
