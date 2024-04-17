import { Component } from '@angular/core';
import { Credential } from '../../../../models/Accounts-Models/credential';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CredentialService } from '../../../../services/general-services/credential/credential.service';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CredentialDTO, ReportDTO, AccountDTO, AuxiliarCredential } from '../../../../DTO/Accounts.dto';

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
  credentials: AuxiliarCredential[] = [];
  filtroAplicado: boolean = false;
  selectedEditAccount: Credential | null = null;
  searchText: string = ""
  credentialsFiltered: AuxiliarCredential[] = []
  DTOCredentials: CredentialDTO[] = []
  DTOreport: ReportDTO[] = []
  DTOAccount: AccountDTO[] = []

  constructor(
    private credentialService: CredentialService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.Actualpage = +params['pagina'] || 1;
      if (this.filtroAplicado) {
        this.credentials = this.credentialsFiltered;
      }
      else {
        this.getCredentials();
      }
    });
  };
  private getCredentials() {
    this.credentialService.getCredentials().subscribe(
      data => {
        console.log(data)
        this.DTOAccount = data.account;
        this.DTOCredentials = data.credentials;
        this.DTOreport = data.report;
        this.credentials = [];
        for (let i = 0; i < this.DTOCredentials.length; i++) {
          this.credentials[i] = { id: 0, email: "", first_name: "", last_name: "", Rol: "", last_login: new Date(), Report: null };
          this.credentials[i].id = this.DTOCredentials[i].id
          this.credentials[i].email = this.DTOCredentials[i].email
          for (let l = 0; l < this.DTOAccount.length; l++) {
            if (this.DTOAccount[l].idcuenta == this.credentials[i].id) {
              console.log("Hola?")
              this.credentials[i].first_name = this.DTOAccount[l].first_name
              this.credentials[i].last_name = this.DTOAccount[l].last_name
              this.credentials[i].last_login = this.DTOAccount[l].last_login
              this.credentials[i].Rol = this.DTOAccount[l].role
              this.DTOAccount.splice(l, 1);
              break;
            }
          }
          for (let l = 0; l < this.DTOreport.length; l++) {
            const report = this.DTOreport[l];
            const credential = this.credentials[i];
            if (report.account_id === credential.id) {
              if (credential.Report === null || report.date > credential.Report?.date) {
                credential.Report = report;
              }
              this.DTOreport.splice(l, 0);
            }
          }
        }
        this.totalPages = Math.ceil(this.credentials.length / 14);
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
        location.reload();
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
      this.getCredentials();
      this.credentialsFiltered = this.credentials.filter(credential => credential.email.toLowerCase().includes(this.searchText.toLowerCase()));
      this.filtroAplicado = true;
      this.credentials = this.credentialsFiltered;
      this.router.navigateByUrl('/home/admin/accounts/?pagina=' + 1)
    }
    else {
      this.filtroAplicado = false;
      this.getCredentials();
    }
  }
}
