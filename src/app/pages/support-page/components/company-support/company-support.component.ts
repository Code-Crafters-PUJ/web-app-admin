import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule, NgForOf, NgIf, NgOptimizedImage } from "@angular/common";
import { CredentialService } from '../../../../services/general-services/credential/credential.service';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from '../../../../services/login-services/storage.service';
import { PqrService } from '../../../../services/PQR-services/pqr.service';
import { PQRDTO, clientDTO, clientPQRDTO } from '../../../../DTO/PQR.dto';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-company-support',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NgForOf,
    NgIf,
    NgOptimizedImage,
    ReactiveFormsModule
  ],
  templateUrl: './company-support.component.html',
  styleUrl: './company-support.component.css'
})
export class CompanySupportComponent {
  isAdmin: boolean = false
  Rol: String = ""
  permiso: Boolean = false
  Permisos: any[] = []
  client: clientDTO | undefined
  pqrs: PQRDTO[] = []
  clientID: string = ""
  selectedIds: number[] = [];

  constructor(
    private credentialService: CredentialService,
    private route: ActivatedRoute,
    private router: Router,
    private storageService: StorageService,
    private pqrService: PqrService
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.clientID = params.get('accountId') || '';
    })
    const currentRoute = this.route.snapshot.routeConfig?.path
    if (currentRoute) {
      this.isAdmin = currentRoute.startsWith('home/admin');
    }
    this.route.queryParams.subscribe(params => {
      this.getClient()
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
  getClient() {
    const id = parseInt(this.clientID, 10);
    this.pqrService.getClient(id).subscribe(
      data => {
        this.client = data.client
      },
      error => {
        console.error('Error al obtener usuarios:', error);
      }
    );
  }
  getPQRS() {
    const id = parseInt(this.clientID, 10);
    this.pqrService.getPQRSClient(id).subscribe(
      data => {
        this.pqrs = data.pqr
        console.log(this.pqrs)
      },
      error => {
        console.error('Error al obtener usuarios:', error);
      }
    );
  }
  toggleSelection(id: number) {
    const index = this.selectedIds.indexOf(id);
    if (index === -1) {
      this.selectedIds.push(id);
    } else {
      this.selectedIds.splice(index, 1);
    }
  }
  deshabilitar() {
    Swal.fire({
      title: 'Se ha deshabilitado',
      text: "Este se ha deshabilitado de manera correcta",
      icon: 'success',
      confirmButtonText: 'OK'
    });
  }
  Impersonalizar() {
    Swal.fire({
      title: 'Se ha impersonalizado',
      text: "Este se ha impersonalizado de manera correcta",
      icon: 'success',
      confirmButtonText: 'OK'
    });
  }
  Responder() {
    if (this.selectedIds.length == 0) {
      Swal.fire({
        title: 'No se ha seleccionado ningun pqr',
        text: "Debe seleccionar almenos uno",
        icon: 'error',
        confirmButtonText: 'OK'
      });

    }
    else {
      Swal.fire({
        title: 'Se ha respondido ' + this.selectedIds.length + ' pqrs',
        text: "La respuesta fue enviada de manera correcta",
        icon: 'success',
        confirmButtonText: 'OK'
      });
    }
  }
}
