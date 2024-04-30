import { Component } from '@angular/core';
import { PQRDTO } from '../../../../DTO/PQR.dto';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import {ActivatedRoute, Router, RouterLink } from '@angular/router';
import { StorageService } from '../../../../services/login-services/storage.service';
import { CredentialService } from '../../../../services/general-services/credential/credential.service';

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

  pqrs:PQRDTO[]=[]
  Actualpage:number=1
  totalPages:number=0
  filtroAplicado: boolean = false;
  searchText: string = ""
  pqrsFiltered: PQRDTO[] = [];
  constructor(
    private credentialService: CredentialService,
    private route: ActivatedRoute,
    private router: Router,
    private storageService: StorageService
  ) { }
  
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
      //this.pqrs = this.pqrs.filter(pqr =>
        //pqr.first_name.toLowerCase().includes(searchTextLower) ||
        //pqr.last_name.toLowerCase().includes(searchTextLower)
      //);
      this.filtroAplicado = true;
    }
    else {
      this.filtroAplicado = false;
      //this.getCredentials();
    }
  }
  private updateURL() {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { pagina: this.Actualpage },
      queryParamsHandling: 'merge',
    });
  }

}
