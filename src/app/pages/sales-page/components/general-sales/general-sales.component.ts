import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {NgOptimizedImage} from "@angular/common";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-general-sales',
  standalone: true,
    imports: [
        FormsModule,
        NgOptimizedImage,
        RouterLink
    ],
  templateUrl: './general-sales.component.html',
  styleUrl: './general-sales.component.css'
})
export class GeneralSalesComponent {

}
