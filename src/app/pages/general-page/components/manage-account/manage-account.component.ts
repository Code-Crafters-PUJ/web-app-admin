import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { Account } from '../../../../models/Accounts-Models/account';
import { ModulsService } from '../../../../services/general-services/moduls/moduls.service';
import { RolService } from '../../../../services/general-services/rol/rol.service';
import { Rol } from '../../../../models/Accounts-Models/rol';
import { Credential } from '../../../../models/Accounts-Models/credential';
import { Report } from '../../../../models/Accounts-Models/report';
import { Module } from '../../../../models/Accounts-Models/Module';
import { CommonModule, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

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
  url: string = "";
  rols: Rol[] = []
  //operations: Operation[] = []
  //moduls: Modul[] = []
  bools:boolean[]=[false,false,false,false]
  rol:string=''
  account: Account = {
    id: 0,
    name: '',
    last_name: '',
    id_card: '',
    last_connection: new Date(),
    connected:0,
    rol: {} as Rol,
    permissions: [],
    Reports:[]
  };
  credential:Credential=
  {
    id:0,
    email:'',
    hash:'',
    account:this.account
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private modulService: ModulsService,
    //private operationService: OperationService,
    private rolService: RolService
  ) { }

  ngOnInit(): void {
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

    //this.getModules();
    //this.getOperations();
    this.getRoles();
  }

  /*private getModules() {
    this.modulService.getModules().subscribe(
      data => {
        this.moduls = data
      },
      error => {
        console.error('Error fetching modules:', error);
      }
    );
  }

  private getOperations() {
    this.operationService.getOperations().subscribe(
      data => {
        this.operations = data
      },
      error => {
        console.error('Error fetching operations:', error);
      }
    );
  }*/

  private getRoles() {
    this.rolService.getRoles().subscribe(
      data => {
        this.rols = data
      },
      error => {
        console.error('Error fetching roles:', error);
      }
    );
  }

  postEntity(): void {
    if (this.url === "new") {
      console.log(this.rol)
      if (this.verificarCampos()) {
        this.router.navigate(['/home/admin/accounts']);
      }
    }
  }

  verificarCampos(): boolean {
    if (!this.account.name || !this.account.id_card || !this.credential.email || !this.credential.hash) {
      alert('Por favor complete todos los campos obligatorios.');
      return false;
    }
    return true;
  }
}
