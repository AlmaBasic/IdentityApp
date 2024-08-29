import { Component } from '@angular/core';
import { AccountService } from '../account/account.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule
  ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(public accountService: AccountService) { }

  logout() {
    this.accountService.logout();
  }
  
}
