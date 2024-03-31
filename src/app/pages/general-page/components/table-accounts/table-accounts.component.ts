import { Component } from '@angular/core';
import { Account } from '../../../../models/general-models/account';
import { ActivatedRoute, Router, RouterLink} from '@angular/router';
import { AccountService } from '../../../../services/general-services/account/account.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-table-accounts',
  standalone: true,
  imports: [CommonModule, FormsModule,RouterLink],
  templateUrl: './table-accounts.component.html',
  styleUrl: './table-accounts.component.css',
})
export class TableAccountsComponent {
  Actualpage: number = 1;
  totalPages: number = 0;
  accounts: Account[] = [];
  filtroAplicado: boolean = false;
  selectedEditAccount: Account | null = null;
  searchText:string=""
  accountsFiltered:Account[]=[]

  constructor(
    private accountService: AccountService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.Actualpage = +params['pagina'] || 1;
      if (this.filtroAplicado) {
        this.accounts = this.accountsFiltered;
      }
      else {
        this.getAccounts();
      }
    });
  };
  private getAccounts() {
    this.accountService.getAccounts().subscribe(
      data => {
        this.accounts = data;
        this.totalPages = Math.ceil(this.accounts.length / 14);
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
  handleOptionChange(event: any,id:number) {
    const selectedOption = event.target.value;
    console.log(selectedOption)
    if (selectedOption == "Modificar") {

    }
    if (selectedOption == "Eliminar") {
      this.deleteAccount(id)
    }
  }
  deleteAccount(i: number) {
    this.accountService.delete(i).subscribe(
      data => {
        this.accounts = data;
        //location.reload();
      },
      error => {
      }
    );
  }
  onInput(value: string) {
    this.searchText = value || '';
  }
  searchByEmail() {
    if (this.searchText.trim().length != 0) {
      this.getAccounts();
      this.accountsFiltered = this.accounts.filter(accounts => accounts.credential.email.toLowerCase().includes(this.searchText.toLowerCase()));
      this.filtroAplicado = true;
      this.accounts = this.accountsFiltered;
      this.router.navigateByUrl('http://localhost:4200/home/admin/accounts').then(() => {
        this.router.navigateByUrl('/?pagina=' + 1);
      });
    }
    else {
      this.filtroAplicado = false;
      this.getAccounts();
    }
  }
}
