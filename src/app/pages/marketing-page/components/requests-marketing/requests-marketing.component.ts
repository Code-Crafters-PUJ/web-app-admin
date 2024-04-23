import { Component, OnInit } from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import { FormsModule, NgForm } from '@angular/forms';
import { DataService } from '../../../../services/marketing-services/data.service';
import { MarketingRequestDto } from '../../../../DTO/marketingRequests.dto';

@Component({
  selector: 'app-requests-marketing',
  standalone: true,
    imports: [NgOptimizedImage, FormsModule],
  templateUrl: './requests-marketing.component.html',
  styleUrl: './requests-marketing.component.css'
})
export class RequestsMarketingComponent implements OnInit {

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.loadMarketingData();
  }

  sendMarketingData(form: NgForm) {
    if (form.valid) {
      this.dataService.sendMarketingData(form.value as MarketingRequestDto).subscribe({
        next: (response) => console.log('Datos de marketing enviados:', response),
        error: (err) => console.error('Error al enviar datos de marketing:', err)
      });
    }
  }

  loadMarketingData() {
    this.dataService.getMarketingData().subscribe({
      next: (data) => console.log('Datos de marketing recibidos:', data),
      error: (err) => console.error('Error al obtener datos de marketing:', err)
    });
  }
}