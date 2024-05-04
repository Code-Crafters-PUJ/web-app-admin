import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ClientService } from '../../../../services/sales-services/client/client.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Client } from '../../../../models/sales-models/client';

@Component({
  selector: 'app-company-info',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './company-info.component.html',
  styleUrl: './company-info.component.css'
})
export class CompanyInfoComponent {
  companyId: number = 0
  client: Client | null = null;
  plan: string=''
  total: number=0
  constructor(
    private clientService: ClientService,
  ) { }

  ngOnInit(): void {
    const companyIdString = sessionStorage.getItem('companyId');
    if (companyIdString !== null) {
      this.companyId = parseInt(companyIdString, 10);
      this.clientService.getClient(this.companyId).subscribe(
        (client: Client) => {
          this.client = client;
        },
        (error) => {
          console.error('Error al obtener los datos del cliente:', error);
        }
      );
      if(this.client!=null)
      {
        if(this.client.billings.length!=0)
        {
          this.plan=this.client.billings[this.client.billings.length-1].plan.type
        }
        for (let i = 0; i < this.client.billings.length; i++) {
          this.total+=this.client.billings[i].plan.price; 
        }
      }
    }
  }
}
