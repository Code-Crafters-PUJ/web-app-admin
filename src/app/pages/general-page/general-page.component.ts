import { Component } from '@angular/core';
import { TableAccountsComponent } from './components/table-accounts/table-accounts.component';

@Component({
  selector: 'app-general-page',
  standalone: true,
  imports: [TableAccountsComponent],
  templateUrl: './general-page.component.html',
  styleUrl: './general-page.component.css',
})
export class GeneralPageComponent {}
