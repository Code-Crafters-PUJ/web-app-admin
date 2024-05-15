import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { CommonModule, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CredentialService } from '../../services/general-services/credential/credential.service';
import Swal from 'sweetalert2';
import { StorageService } from '../../services/login-services/storage.service';
import { SidebarComponent } from '../../global/sidebar/sidebar.component';

@Component({
  selector: 'app-cambiar-contrasenia',
  standalone: true,
  imports: [
    NgIf,
    RouterLink,
    CommonModule,
    FormsModule,
    SidebarComponent
  ],
  templateUrl: './cambiar-contrasenia.component.html',
  styleUrls: ['./cambiar-contrasenia.component.css']

})

export class cambiarContraseniaComponent implements OnInit {

  accountExtracted: any = {};
  passForm: string = '';
  url: string = "";
  account: any = {};
  isAdmin: boolean = false
  id:number=0



  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private credentialservice: CredentialService,
    private storageService: StorageService
  ) { }

  ngOnInit(): void {
    this.id=this.storageService.getID()
    const currentRoute = this.route.snapshot.routeConfig?.path;
    if (currentRoute) {
      this.isAdmin = currentRoute.startsWith('home/admin');
    }

    const currentUrl = this.router.url;
    const segments = currentUrl.split('/');
    const segment = segments[4];

    switch (segment) {
      case 'new':
        this.url = 'new';
        break;
      case 'modify':
        this.url = 'modify';
        break;
      default:
        this.url = 'new';
    }
  }

  verificarCampos(): boolean {
    if (!this.account.hash) {
      Swal.fire({
        title: 'Ups!',
        text: "Los campos deben estar completos",
        icon: 'error',
        confirmButtonText: 'OK'
      });
      return false;
    }
    return true;
  }

  guardarCambios(): void {
      interface DatosActualizados {
        hash?: any;
      }

      const datosActualizados: DatosActualizados = {
        hash:this.passForm

      };
      if (this.passForm) {
        datosActualizados.hash = this.passForm;
        this.credentialservice.putModifyAccount(this.id, datosActualizados).subscribe(
          response => {
            Swal.fire({
              title: 'Modificación Exitosa!',
              text: "La cuenta fue cambiada de manera correcta",
              icon: 'success',
              confirmButtonText: 'OK'
            });
            if (this.isAdmin) {
              this.router.navigate(['/home/admin/general']);
            }
            else {
              this.router.navigate(['/home/all']);
            }
          }
          ,
          error => {
            console.error(error);
          }
        );
      }
      else
      {
        Swal.fire({
          title: 'No puedes dejar la contraseña vacia!',
          text: "La cuenta debe tener una contraseña",
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
  }
}