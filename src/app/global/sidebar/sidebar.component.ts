import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  standalone: true,
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
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
