import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { Rol } from '../../../../models/Accounts-Models/rol';
import { CommonModule, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CredentialService } from '../../../../services/general-services/credential/credential.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage-account',
  standalone: true,
  imports: [
    NgIf,
    RouterLink,
    CommonModule,
    FormsModule,
  ],
  templateUrl: './manage-account.component.html',
  styleUrls: ['./manage-account.component.css']

})

export class ManageAccountComponent implements OnInit {

  accountExtracted: any = {};
  credentialExtracted: any = {};
  permissionExtracted: any = {};

  passForm: string='';

  accountId: string="";
  url: string = "";
  rols: Rol[] = []
  account: any = {};
  credential: any = {};
  rol: string = ''
  permisos = [
    { nombre: 'Monitoreo', visualizar: false, modificar: false },
    { nombre: 'Soporte', visualizar: false, modificar: false },
    { nombre: 'Marketing', visualizar: false, modificar: false },
    { nombre: 'Ventas', visualizar:false,modificar:false}
  ];


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private credentialservice: CredentialService,
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      // Extrae el ID de la cuenta de los parámetros de la URL
      this.accountId = params.get('accountId') || ''; // Asignamos un valor predeterminado en caso de que params.get('accountId') sea null
      if(this.accountId!='')
        {
          this.getAccount();
        }
    });
    
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


  private getAccount() {
    const id = parseInt(this.accountId, 10);
    this.credentialservice.getUniqueCredential(id).subscribe(
      data => {
        this.accountExtracted=data.user;
        if (data ) {
          this.credentialExtracted = data.credentials[0];
        }
        this.permissionExtracted=data.permissions;

        console.log('Account única obtenida:', this.accountExtracted);
        console.log('Credencial única obtenida:', this.credentialExtracted);
        console.log('Permisos única obtenida:', this.permissionExtracted);
        this.llenarTabla(data)
      },
      error => {
        console.error('Error fetching roles:', error);
      }
    );
  }

  postEntity(): void {
    if (this.url === "new") {
      if (this.verificarCampos() && this.esCorreoValido()) {
        const formData = {
          name: this.account.name,
          id_card: this.account.id_card,
          last_name: this.account.last_name,
          rol: this.rol,
          email: this.credential.email,
          hash: this.credential.hash,
          permissions: { ...this.permisos }
        };

        const formDataJSON = JSON.stringify(formData, (key, value) => {
          if (key === 'permissions') {
            return value;
          }
          return value;
        }, 2);
        this.credentialservice.postCredential(formData).subscribe(
          response => {
            if(response.message=="El email ya esta registrado")
              {
                Swal.fire({
                  title: 'Ups!',
                  text: "Ese correo Ya esta registrado",
                  icon: 'warning',
                  confirmButtonText: 'OK'
                });
              }
            else if(response.message=="El ID ya existe en la base de datos")
              {
                Swal.fire({
                  title: 'Ups!',
                  text: "Ese ID Ya esta registrado",
                  icon: 'warning',
                  confirmButtonText: 'OK'
                });
              }
              else
              {
                Swal.fire({
                  title: 'Registro Exitoso!',
                  text: "La cuenta fue creada de manera correcta",
                  icon: 'success',
                  confirmButtonText: 'OK'
                });
              }
          },
          error => {
            console.error(error);
          }
        );
      }
    }
  }
  esCorreoValido(): boolean {
    const patron = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if(!patron.test(this.credential.email))
      {
        Swal.fire({
          title: 'Ups!',
          text: "Ese correo no es valido",
          icon: 'error',
          confirmButtonText: 'OK'
        });
        return false
      }
      return true
  }
  verificarCampos(): boolean {
    if (!this.account.name || !this.account.id_card || !this.credential.email || !this.credential.hash) {
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

  llenarTabla(data:any): void{
  // Obtener la tabla de permisos
  const permissionsTable = document.querySelector('table.table');

  // Si se encontró la tabla de permisos
  if (permissionsTable) {
      // Obtener las filas de la tabla de permisos
      const rows = permissionsTable.querySelectorAll('tbody tr');

      // Iterar sobre las filas de la tabla
      rows.forEach((row, index) => {
          // Obtener el permiso correspondiente según el índice
          const permission = data.permissions[index];

          // Obtener los checkboxes de la fila
          const checkboxes = row.querySelectorAll('input[type="checkbox"]');

          // Marcar los checkboxes según los valores del permiso
          (checkboxes[0] as HTMLInputElement).checked = permission.can_view; // Primer checkbox: Visualizar
          (checkboxes[1] as HTMLInputElement).checked = permission.can_modify; // Segundo checkbox: Modificar
      });
  }


  }

  obtenerCambiosPermisos(dataOriginal: any[], dataActual: any[]): any[] {
    const cambios: any[] = [];

    // Itera sobre los permisos y compara con los originales
    for (let i = 0; i < dataOriginal.length; i++) {
        const permisoOriginal = dataOriginal[i];
        const permisoActual = dataActual[i];

        // Compara los permisos
        if (
            permisoOriginal.can_view !== permisoActual.can_view ||
            permisoOriginal.can_modify !== permisoActual.can_modify
            // Agrega otras condiciones de comparación si es necesario
        ) {
            cambios.push(permisoActual); // Agrega el permiso modificado a la lista de cambios
        }
    }

    return cambios;
}



guardarCambios():void{
    interface DatosActualizados {
      name: any;
      last_name: any;
      id_card: any;
      email: any;
      rol?: any;
      hash?: any; // La contraseña es opcional
      [key: string]: any; // Permite añadir campos adicionales de cualquier tipo
    }

    console.log("AAAA:"+JSON.stringify(this.obtenerNuevaInformacionDesdeCheckbox()))
    
    const datosActualizados: DatosActualizados = {
      name: this.accountExtracted.first_name,
      last_name: this.accountExtracted.last_name,
      id_card: this.accountExtracted.id_card,
      email: this.credentialExtracted.email,
      
    };
    
    if(this.accountExtracted.role=="Admin"){
      datosActualizados.rol = 1;
    }
    if(this.accountExtracted.role=="Ventas"){
      datosActualizados.rol = 2;
    }
    if(this.accountExtracted.role=="Soporte"){
      datosActualizados.rol = 3;
    }
    if(this.accountExtracted.role=="Marketing"){
      datosActualizados.rol = 4;
    }
    if(this.accountExtracted.role=="Monitoreo"){
      datosActualizados.rol = 5;
    }
    // Verificar si el campo de contraseña no está vacío antes de agregarlo
    if (this.passForm) {
      datosActualizados.hash = this.passForm;
    }

      const id = parseInt(this.accountId, 10);
      this.credentialservice.putModifyAccount(id,datosActualizados).subscribe(
        response => {
          console.log(response.message);
        },
        error => {
          console.error(error);
        }
      );
}

obtenerNuevaInformacionDesdeCheckbox(): any[] {
  const nuevaInformacion: any[] = [];

  // Obtener todas las filas de la tabla de permisos
  const rows = document.querySelectorAll('table.table tbody tr');

  // Iterar sobre cada fila de la tabla
  rows.forEach((row) => {
    const permission: any = {}; // Objeto para almacenar la información del permiso

    // Obtener el nombre del permiso de la primera celda de la fila
    const nombreElement = row.querySelector('td:first-child');
    const nombre = nombreElement ? nombreElement.textContent?.trim() : undefined;

    if (nombre !== undefined) {
      // Obtener los checkboxes de la fila
      const checkboxes = row.querySelectorAll('input[type="checkbox"]');

      // Verificar si se encontraron los checkboxes
      if (checkboxes.length === 2) {
        // Almacenar el estado de los checkboxes en el objeto permission
        permission[nombre] = {
          can_view: (checkboxes[0] as HTMLInputElement).checked,
          can_modify: (checkboxes[1] as HTMLInputElement).checked
        };

        // Agregar el objeto permission al arreglo nuevaInformacion
        nuevaInformacion.push(permission);
      } else {
        console.error('No se encontraron los checkboxes para la fila:', row);
      }
    }
  });

  return nuevaInformacion;
}




}

