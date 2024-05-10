import {Component, OnInit} from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import Chart from "chart.js/auto";

@Component({
  selector: 'app-general-support',
  standalone: true,
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './general-support.component.html',
  styleUrl: './general-support.component.css'
})
export class GeneralSupportComponent implements OnInit {

  public barChart: any;
  public lineChart: any;


  ngOnInit(): void {
    this.createBarChart();
    this.createLineChart();
  }


  createBarChart() {
    this.barChart = new Chart("barChart", {
      type: 'bar',
      data: {
        labels: ['Administrativo', 'Ventas', 'Marketing', 'Soporte'],
        datasets: [{
          label: 'Porcentaje de servidoes',
          data: [65, 59, 25, 94],
          backgroundColor: [
            'rgb(0,31,134)'
          ]
        }]
      }
    })
  }

  createLineChart() {
    this.lineChart = new Chart("lineChart", {
      type: 'line',
      data: {
        labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
        datasets: [{
          label: 'Porcentaje de infraestructura',
          data: [80, 60, 25, 80, 80, 100, 90, 20, 130, 140, 5, 45],
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
