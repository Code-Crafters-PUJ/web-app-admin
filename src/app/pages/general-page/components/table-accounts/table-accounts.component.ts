import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CredentialService } from '../../../../services/general-services/credential/credential.service';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AccountDTO} from '../../../../DTO/Accounts.dto';

@Component({
  selector: 'app-table-accounts',
  standalone: true,
  imports: [
    RouterLink,
    NgOptimizedImage,
    CommonModule,
    FormsModule
  ],
  templateUrl: './table-accounts.component.html',
  styleUrl: './table-accounts.component.css',
})
export class TableAccountsComponent {
  Actualpage: number = 1;
  totalPages: number = 0;
  filtroAplicado: boolean = false;
  selectedEditAccount: Credential | null = null;
  searchText: string = ""
  accounts: AccountDTO[] = [];
  accountsFiltered: AccountDTO[] = [];


  constructor(
    private credentialService: CredentialService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.Actualpage = +params['pagina'] || 1;
      this.getCredentials()
    });
  };
  private getCredentials() {
    this.credentialService.getCredentials().subscribe(
      data => {
        this.accounts=data.collection
        console.log(this.accounts)
        this.totalPages = Math.ceil(this.accounts.length / 14);
      },
      error => {
        console.error('Error al obtener usuarios:', error);
      }
    );
  }

  setSelectedEditAccount(optionalAccount: Credential): void {
    if (this.selectedEditAccount === optionalAccount) {
      this.selectedEditAccount = null;
      return;
    }
    this.selectedEditAccount = optionalAccount;
  }
  private updateURL() {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { pagina: this.Actualpage },
      queryParamsHandling: 'merge',
    });
  }

  previousPage() {
    if (this.Actualpage > 1) {
      this.Actualpage--;
      this.updateURL();
    }
  }

  nextPage() {
    if (this.Actualpage < this.totalPages) {
      this.Actualpage++;
      this.updateURL();
    }
  }

  deleteAccount(i: number) {
    this.credentialService.delete(i).subscribe(
      data => {
       
      },
      error => {
      }
    );
  }
  onInput(value: string) {
    this.searchText = value || '';
  }
  searchByName() {
    if (this.filtroAplicado) {
      this.accounts = this.accountsFiltered
      this.filtroAplicado = false
    }
    if (this.searchText.trim().length != 0) {
      this.accountsFiltered = this.accounts
      const searchTextLower = this.searchText.toLowerCase();
      this.accounts = this.accounts.filter(account =>
        account.first_name.toLowerCase().includes(searchTextLower) ||
        account.last_name.toLowerCase().includes(searchTextLower)
      );
      this.filtroAplicado = true;
    }
    else {
      this.filtroAplicado = false;
      this.getCredentials();
    }
  }
}
