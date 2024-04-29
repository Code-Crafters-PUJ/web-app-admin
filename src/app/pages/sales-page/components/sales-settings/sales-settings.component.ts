import { Component } from '@angular/core';
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-sales-settings',
  standalone: true,
    imports: [
        NgOptimizedImage
    ],
  templateUrl: './sales-settings.component.html',
  styleUrl: './sales-settings.component.css'
})
export class SalesSettingsComponent {

}
