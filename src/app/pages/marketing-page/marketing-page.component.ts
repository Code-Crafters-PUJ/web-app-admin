import {Component, OnInit} from '@angular/core';
import {NgIf} from "@angular/common";
import {SidebarComponent} from "../../global/sidebar/sidebar.component";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-marketing-page',
  standalone: true,
    imports: [
        NgIf,
        SidebarComponent,
    ],
  templateUrl: './marketing-page.component.html',
  styleUrl: './marketing-page.component.css'
})
export class MarketingPageComponent implements OnInit{

  url: string = 'general';

  constructor(private route:ActivatedRoute, private router: Router) {}

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
        this.url = 'requests';
        break;
      default:
        this.url = 'general';
    }
  }
}
