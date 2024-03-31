import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
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

  url: string = 'general';

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    const currentUrl = this.router.url;
    const segments = currentUrl.split('/');
    const segment = segments[3];
    const lastSegment = segments[4];

    switch (segment) {
      case 'general':
        this.url = 'general';
        break;
      case 'accounts':
        if (lastSegment === 'new') {
          this.url = 'new';
        } else if (lastSegment === 'modify') {
          this.url = 'modify';
        } else {
          this.url = 'accounts';
        }
        break;
      default:
        this.url = 'general';
    }
  }
}
