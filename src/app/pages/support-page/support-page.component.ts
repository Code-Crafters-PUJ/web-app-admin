import {Component, OnInit} from '@angular/core';
import {NgIf} from "@angular/common";
import {SidebarComponent} from "../../global/sidebar/sidebar.component";
import {ActivatedRoute, Router} from "@angular/router";
import {GeneralSupportComponent} from "./components/general-support/general-support.component";
import {RequestsSupportComponent} from "./components/requests-support/requests-support.component";
import {CompanySupportComponent} from "./components/company-support/company-support.component";

@Component({
  selector: 'app-support-page',
  standalone: true,
  imports: [
    NgIf,
    SidebarComponent,
    GeneralSupportComponent,
    RequestsSupportComponent,
    CompanySupportComponent
  ],
  templateUrl: './support-page.component.html',
  styleUrl: './support-page.component.css'
})
export class SupportPageComponent  implements OnInit{

    url: string = 'general';

    constructor(private route: ActivatedRoute, private router:Router) {}

    ngOnInit() {
      const currentUrl = this.router.url;
      const segments = currentUrl.split('/');
      const segment = segments[3];
      const lastSegment = segments[4];

      switch (segment) {
        case 'general':
          this.url = 'general';
          break;
        case 'requests':
          if (lastSegment === 'company') {
            this.url = 'company';
          }else {
            this.url = 'requests';
          }
          break;
        default:
          this.url = 'general';
      }
    }

}
