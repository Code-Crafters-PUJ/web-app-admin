import { Component } from '@angular/core';
import { Credential } from '../../../../models/Accounts-Models/credential';
import { ActivatedRoute, Router, RouterLink} from '@angular/router';
import { CredentialService } from '../../../../services/general-services/credential/credential.service';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import { FormsModule } from '@angular/forms';

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
  credentials: Credential[] = [];
  filtroAplicado: boolean = false;
  selectedEditAccount: Credential | null = null;
  searchText:string=""
  credentialsFiltered:Credential[]=[]

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
        this.credentials = data;
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
      this.router.navigateByUrl('/home/admin/accounts/?pagina='+1)
    }
    else {
      this.filtroAplicado = false;
      this.getCredentials();
    }
  }
}
