import { Component, OnInit } from '@angular/core';
import { CommonModule, NgIf } from "@angular/common";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { Account } from '../../../../models/general-models/account';
import { FormsModule } from '@angular/forms';
import {AccountFactory} from '../../../../models/Instance/AccountFactory'

@Component({
  selector: 'app-manage-account',
  standalone: true,
  imports: [
    NgIf,
    RouterLink,
    CommonModule,
    FormsModule
  ],
  templateUrl: './manage-account.component.html',
  styleUrl: './manage-account.component.css'
})
export class ManageAccountComponent implements OnInit {

  url: string = 'new';
  account:Account


  constructor(private route: ActivatedRoute, private router: Router) {
    this.account = AccountFactory.createEmptyAccount();
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
  postEntity(): void {
    if(this.url=="new")
    {
      
      

    }

  }

}
