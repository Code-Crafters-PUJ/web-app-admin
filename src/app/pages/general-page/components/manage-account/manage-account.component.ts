import {Component, OnInit} from '@angular/core';
import {NgIf} from "@angular/common";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";

@Component({
  selector: 'app-manage-account',
  standalone: true,
  imports: [
    NgIf,
    RouterLink
  ],
  templateUrl: './manage-account.component.html',
  styleUrl: './manage-account.component.css'
})
export class ManageAccountComponent implements OnInit {

  url: string = 'new';

  constructor(private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {

    const currentUrl = this.router.url;
    const segments = currentUrl.split('/');
    const segment = segments[4];

    switch (segment) {
      case 'new':
        this.url = 'new';
        break;
      case 'modify':
        this.url = 'modify';
        break;
      default:
        this.url = 'new';
    }

  }

}
