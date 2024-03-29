import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  constructor(private route: ActivatedRoute) {}
  isFacturacionPage(): boolean {
    return this.route.snapshot.routeConfig?.path === 'Facturacion';
  }

}
