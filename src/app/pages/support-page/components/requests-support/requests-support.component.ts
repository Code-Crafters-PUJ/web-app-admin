import { Component } from '@angular/core';
import { PQRDTO } from '../../../../DTO/PQR.dto';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { StorageService } from '../../../../services/login-services/storage.service';
import { CredentialService } from '../../../../services/general-services/credential/credential.service';
import { PqrService } from '../../../../services/PQR-services/pqr.service';

@Component({
  selector: 'app-requests-support',
  standalone: true,
  imports: [
    RouterLink,
    NgOptimizedImage,
    CommonModule,
    FormsModule
  ],
  templateUrl: './requests-support.component.html',
  styleUrl: './requests-support.component.css'
})
export class RequestsSupportComponent {

  pqrs: PQRDTO[] = []
  Actualpage: number = 1
  totalPages: number = 0
  filtroAplicado: boolean = false;
  searchText: string = ""
  pqrsFiltered: PQRDTO[] = [];
  isAdmin:boolean=false
  Rol:String=""
  permiso:Boolean=false
  Permisos:any[]=[]

  constructor(
    private credentialService: CredentialService,
    private route: ActivatedRoute,
    private router: Router,
    private storageService: StorageService,
    private pqrService:PqrService
  ) { }

  ngOnInit() {
    const currentRoute = this.route.snapshot.routeConfig?.path
    if (currentRoute) {
      this.isAdmin = currentRoute.startsWith('home/admin');
    }
    this.route.queryParams.subscribe(params => {
      this.Actualpage = +params['pagina'] || 1;
      this.getPQRS()
      this.Rol = (this.storageService.getSavedAccount()?.role) || "";
      if (this.Rol == '"Admin"') {
        this.permiso = true
      }
      else {
        this.Permisos = this.storageService.getPermissions()
        if (this.Permisos[1].can_modify) {
          this.permiso = true
        }
      }
    });
  };

  private getPQRS() {
    this.pqrService.getPQRS().subscribe(
      data => {
        this.pqrs = data.pqrs
        this.totalPages = Math.ceil(this.pqrs.length / 14);
      },
      error => {
        console.error('Error al obtener usuarios:', error);
      }
    );
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

  onInput(value: string) {
    this.searchText = value || '';
  }
  searchByName() {
    if (this.filtroAplicado) {
      this.pqrs = this.pqrsFiltered
      this.filtroAplicado = false
    }
    if (this.searchText.trim().length != 0) {
      this.pqrsFiltered = this.pqrs
      const searchTextLower = this.searchText.toLowerCase();
      this.pqrs = this.pqrs.filter(pqr =>
      pqr.company_name.toLowerCase().includes(searchTextLower)
      );
      this.filtroAplicado = true;
    }
    else {
      this.filtroAplicado = false;
      this.getPQRS();
    }
  }
  private updateURL() {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { pagina: this.Actualpage },
      queryParamsHandling: 'merge',
    });
  }
  redirectToCompanyPage(id:number) {
    if (this.isAdmin) {
      this.router.navigate(['/home/admin/requests/company/'+id]);
    } else {
      this.router.navigate(['/home/support/requests/company/'+ id]);
    }
  }

}
