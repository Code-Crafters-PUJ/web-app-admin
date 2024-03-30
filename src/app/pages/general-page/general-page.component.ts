import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import {TableAccountsComponent} from "./components/table-accounts/table-accounts.component";
import {GeneralInformationComponent} from "./components/general-information/general-information.component";
import {ManageAccountComponent} from "./components/manage-account/manage-account.component";
import {SidebarComponent} from "../../global/sidebar/sidebar.component";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-general-page',
  templateUrl: './general-page.component.html',
  standalone: true,
  imports: [
    TableAccountsComponent,
    GeneralInformationComponent,
    ManageAccountComponent,
    SidebarComponent,
    NgIf
  ],
  styleUrls: ['./general-page.component.css']
})
export class GeneralPageComponent implements OnInit {

  url: 'accounts' | 'general' | 'manage-account' = 'accounts';

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    const currentUrl = this.router.url;
    const segments = currentUrl.split('/');
    const lastSegment = segments[segments.length - 1];

    switch (lastSegment) {
      case 'general':
      case 'accounts':
      case 'manage-account':
        this.url = lastSegment;
        break;
      default:
        this.url = 'general';
    }
  }
}