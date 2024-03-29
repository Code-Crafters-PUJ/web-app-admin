import { Component } from '@angular/core';
import { TableAccountsComponent } from './components/table-accounts/table-accounts.component';
import {SidebarComponent} from "../../global/sidebar/sidebar.component";
import {GeneralInformationComponent} from "./components/general-information/general-information.component";
import {ManageAccountComponent} from "./components/manage-account/manage-account.component";

@Component({
  selector: 'app-general-page',
  standalone: true,
  imports: [TableAccountsComponent, SidebarComponent, GeneralInformationComponent, ManageAccountComponent],
  templateUrl: './general-page.component.html',
  styleUrl: './general-page.component.css',
})
export class GeneralPageComponent {}
