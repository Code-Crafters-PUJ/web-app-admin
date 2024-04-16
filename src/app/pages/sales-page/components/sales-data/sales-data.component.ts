import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ClientService } from '../../../../services/sales-services/client/client.service';
import { Client } from '../../../../models/sales-models/client';
import { Subscription } from '../../../../models/sales-models/billing';

@Component({
  selector: 'app-sales-data',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './sales-data.component.html',
  styleUrl: './sales-data.component.css'
})
export class SalesDataComponent {
  companyId: number = 0
  client: Client | null = null;
  Actualpage: number = 1;
  totalPages: number = 0;
  constructor(private route: ActivatedRoute,
    private router: Router,
    private clientService: ClientService) {
  }
  subscriptions: Subscription[] = []
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
      if (this.client != null) {
        for (let i = 0; i < this.client.subscriptions.length; i++) {
          this.subscriptions[i] = this.client.subscriptions[i]
        }
        this.totalPages = Math.ceil(this.subscriptions.length /5);
      }
    }
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
  private updateURL() {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { pagina: this.Actualpage },
      queryParamsHandling: 'merge',
    });
  }
}