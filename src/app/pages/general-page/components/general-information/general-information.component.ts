import { Component, OnInit } from '@angular/core';
import { Credential } from '../../../../models/Accounts-Models/credential';
import { ActivatedRoute, Router } from '@angular/router';
import { CredentialService } from '../../../../services/general-services/credential/credential.service';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import Chart from 'chart.js/auto';
import { ClientService } from '../../../../services/sales-services/client/client.service';
import { Client } from '../../../../models/sales-models/client';
import { Billing } from '../../../../models/sales-models/billing';
import { PqrService } from '../../../../services/PQR-services/pqr.service';


@Component({
  selector: 'app-general-information',
  standalone: true,
  imports: [NgOptimizedImage, CommonModule],
  templateUrl: './general-information.component.html',
  styleUrl: './general-information.component.css'
})
export class GeneralInformationComponent implements OnInit {
  credentials: Credential[] = [];
  selectedEditAccount: Credential | null = null;
  public doughnutChart: any;
  public lineChart: any;
  clients: Client[] = []
  active: number = 0
  notActive: number = 0
  totalMoneyAmount: number = 0
  totalUserAmount: number = 0
  percentage: number = 0
  newUsers: number = 0
  problems:number=0



  constructor(
    private credentialService: CredentialService,
    private clientService: ClientService,
    private pqrService:PqrService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.getAccounts();
    this.getProblems();
    this.GetClientsinfo();
    this.createLineChart();

  };

  private getProblems()
  {
    this.pqrService.getPQRS().subscribe(
      data=>
        {
          this.problems=data.pqrs.length

        },
        error=>
          {
            console.error('Error al obtener PQRS:', error);
          }
    )
  }

  private getAccounts() {
    this.credentialService.getCredentials().subscribe(
      data => {
        this.credentials = data;
      },
      error => {
        console.error('Error al obtener usuarios:', error);
      }
    );
  }
  private GetClientsinfo() {
    this.clientService.getClients().subscribe(
      data => {
        this.clients = data.clients
        this.totalUserAmount = this.clients.length
        this.clients.forEach(client => {
          if (client.active) {
            this.active++
          }
          else {
            this.notActive++
          }
          client.billings.forEach(billing => {
            this.totalMoneyAmount += billing.amount
            const fecha = new Date(billing.initialDate);
            if (billing.initialDate && this.fechaEnEsteMes(fecha)) {
              this.newUsers++
            }
          });
        });
        this.percentage = this.active / this.totalUserAmount
        this.CreateDoughnutChart();
      }, error => {
        console.error('Error al obtener usuarios:', error);
      }
    );
  }
  fechaEnEsteMes(fecha: Date): boolean {
    const fechaActual = new Date();
    return (
      fecha.getFullYear() === fechaActual.getFullYear() &&
      fecha.getMonth() === fechaActual.getMonth()
    );
  }

  CreateDoughnutChart() {
    this.doughnutChart = new Chart("MyChart", {
      type: 'doughnut',
      data: {
        labels: [
          'Inactivos',
          'Activos'
        ],
        datasets: [{
          label: 'Usuarios Activos',
          data: [this.notActive, this.active],
          backgroundColor: [
            'rgb(245,105,29)',
            'rgb(0, 74, 173)'
          ],
          hoverOffset: 4
        }]
      },
      options: {
        plugins: {
          legend: {
            display: true,
            labels: {
              font: {
                size: 14,
                family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif"
              }
            }
          }
        }
      }
    });
  }

  createLineChart() {
    this.lineChart = new Chart("lineChart", {
      type: 'line',
      data: {
        labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
        datasets: [{
          label: 'Usuarios Conectados',
          data: [80, 60, 25, 80, 200, 100, 110, 20, 130, 140, 40, 160],
          borderColor: 'rgb(0,74,173)',
          tension: 0.1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
}



