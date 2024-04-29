import {Component, OnInit} from '@angular/core';
import {Credential} from '../../../../models/Accounts-Models/credential';
import {ActivatedRoute, Router} from '@angular/router';
import {CredentialService} from '../../../../services/general-services/credential/credential.service';
import {NgOptimizedImage} from '@angular/common';
import Chart from 'chart.js/auto';


@Component({
  selector: 'app-general-information',
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: './general-information.component.html',
  styleUrl: './general-information.component.css'
})
export class GeneralInformationComponent implements OnInit {
  credentials: Credential[] = [];
  selectedEditAccount: Credential | null = null;
  public doughnutChart: any;
  public lineChart: any;



  constructor(
    private credentialService: CredentialService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.getAccounts();
    this.CreateDoughnutChart();
    this.createLineChart();

  };


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
          data: [35, 90],
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



