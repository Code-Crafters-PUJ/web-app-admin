import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CredentialService } from '../../../../services/general-services/credential/credential.service';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AccountDTO } from '../../../../DTO/Accounts.dto';
import { StorageService } from '../../../../services/login-services/storage.service';
import Swal from 'sweetalert2';

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
  Permisos: any[] = []
  Rol: String = ""
  permiso: Boolean = false
  isAdmin: boolean = false;


  constructor(
    private credentialService: CredentialService,
    private route: ActivatedRoute,
    private router: Router,
    private storageService: StorageService
  ) { }

  ngOnInit() {
    const currentRoute = this.route.snapshot.routeConfig?.path
    if (currentRoute) {
      this.isAdmin = currentRoute.startsWith('home/admin');
    }
    this.route.queryParams.subscribe(params => {
      this.Actualpage = +params['pagina'] || 1;
      this.getCredentials()
      this.Rol = (this.storageService.getSavedAccount()?.role) || "";
      if (this.Rol == '"Admin"') {
        this.permiso = true
      }
      else {
        this.Permisos = this.storageService.getPermissions()
        if (this.Permisos[0].can_modify) {
          this.permiso = true
        }
      }
    });
  };
  private getCredentials() {
    this.credentialService.getCredentials().subscribe(
      data => {
        this.accounts = data.collection
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
    if (this.permiso) {
      this.credentialService.delete(i).subscribe(
        data => {

        },
        error => {
        }
      );
    }
    else
    {
      Swal.fire({
        title: 'No tienes Permisos!',
        text: "Habla con tu administrador para poder realizar esta acción",
        icon: 'warning',
        confirmButtonText: 'OK'
      });
    }
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
