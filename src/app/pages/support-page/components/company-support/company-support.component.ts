import { Component } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgForOf, NgIf, NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-company-support',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    NgIf,
    NgOptimizedImage,
    ReactiveFormsModule
  ],
  templateUrl: './company-support.component.html',
  styleUrl: './company-support.component.css'
})
export class CompanySupportComponent {

}
