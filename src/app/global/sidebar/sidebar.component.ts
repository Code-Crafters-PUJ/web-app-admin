import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { NgIf, NgOptimizedImage } from "@angular/common";
import { StorageService } from '../../services/login-services/storage.service';
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

  Roles: String[] = []



  constructor(private route: ActivatedRoute, private router: Router, private storageService: StorageService) { }

  ngOnInit(): void {

    const isadmin = this.storageService.getSavedAccount()
    if (isadmin) {
      if (isadmin.role.replace(/"/g, '') == "Admin") {
        this.Roles.push("Admin")
      }
      else {
        const roles = this.storageService.getPermissions()
        for (const rol of roles) {
          if (rol.can_view) {
            this.Roles.push(rol.module_name)
          }
        }
      }
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
