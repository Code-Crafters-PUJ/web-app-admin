import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {NgIf, NgOptimizedImage} from "@angular/common";
declare var $: any;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  standalone: true,
    imports: [
        RouterLink,
        NgOptimizedImage,
        NgIf
    ],
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  url: string = 'home';

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    const currentUrl = this.router.url;
    const segments = currentUrl.split('/');
    const segment = segments[2];

    switch (segment) {
      case 'admin':
        this.url = 'admin';
        break;
      case 'accounts':
        this.url = 'accounts';
        break;
      default:
        this.url = 'home';
    }
    $(document).ready(() => {
      $(".sidebar-nav li a").click(function (this: HTMLElement) {
        $(".sidebar-nav li a").removeClass("active");
        $(this).addClass("active");
      });

      $("#menu-toggle").click((e: MouseEvent) => {
        e.preventDefault();
        $("#wrapper").toggleClass("menuDisplayed");
      });
    });


  }
}
