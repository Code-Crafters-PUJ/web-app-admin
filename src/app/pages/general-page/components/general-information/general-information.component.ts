import {Component, OnInit} from '@angular/core';
import {Account} from '../../../../models/general-models/account';
import {ActivatedRoute, Router} from '@angular/router';
import {AccountService} from '../../../../services/general-services/account/account.service';
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
  accounts: Account[] = [];
  selectedEditAccount: Account | null = null;
  public doughnutChart: any;
  public lineChart: any;



  constructor(
    private accountService: AccountService,
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
    this.accountService.getAccounts().subscribe(
      data => {
        this.accounts = data;
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
            'rgb(245,29,29)',
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
        labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        datasets: [{
          label: 'Usuarios Conectados',
          data: [50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160],
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



