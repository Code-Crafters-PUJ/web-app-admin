import {Component, OnInit} from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import Chart from "chart.js/auto";
import { DataService } from '../../../../services/marketing-services/data.service';
import { GraphData } from '../../../../DTO/marketingRequests.dto';

@Component({
  selector: 'app-general-marketing',
  standalone: true,
    imports: [
        NgOptimizedImage
    ],
  templateUrl: './general-marketing.component.html',
  styleUrl: './general-marketing.component.css'
})
export class GeneralMarketingComponent implements OnInit {

  public doughnutChart: any;
  public lineChart: any;
  public barChart: any;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getGraphData().subscribe({
      next: (graphData: GraphData) => {
        this.createDoughnutChart(graphData.activos);
        this.createLineChart(graphData.monitoreoMes);
        this.createBarChart(graphData.monitoreoTipo);
      },
      error: (error) => console.error('Failed to load graph data:', error)
    });
  }


  createDoughnutChart(data: number[]) {
    this.doughnutChart = new Chart("MyChart", {
      type: 'doughnut',
      data: {
        labels: [
          'Inactivos',
          'Activos'
        ],
        datasets: [{
          label: 'Usuarios Activos',
          data: data,
          backgroundColor: [
            'rgb(245,105,29)',
            'rgb(0,31,134)'
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

  createLineChart(data: number[]) {
    this.lineChart = new Chart("lineChart", {
      type: 'line',
      data: {
        labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
        datasets: [{
          label: 'Usuarios Conectados',
          data: data,
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

  createBarChart(data: { administrativo: number; ventas: number; marketing: number; soporte: number }) {
    this.barChart = new Chart("barChart", {
      type: 'bar',
      data: {
        labels: ['Administrativo', 'Ventas', 'Marketing', 'Soporte'],
        datasets: [{
          label: 'Porcentaje de servidoes',
          data: Object.values(data), 
          backgroundColor: [
            'rgb(0,31,134)'
          ]
        }]
      }
    })
  }



}