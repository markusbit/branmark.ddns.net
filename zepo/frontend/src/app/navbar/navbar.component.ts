import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/shared/models/User';
import { CardService } from '../services/card.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user!:User;
  opened = false;
  public logoSrc: string = 'favicon.ico';

  constructor(private userService:UserService, private router:Router) {
    userService.userObservable.subscribe((newUser) => {
      this.user = newUser;
    })
    this.router.events.subscribe(() => {
      this.opened = false;
    });
  }

  ngOnInit(): void {
  }

  toggleSideNav() {
    this.opened = !this.opened;
  }

  isLoggedIn() {
    return localStorage.getItem('User');
  }

  logout() {
    this.userService.logout();
  }

  search(searchTerm:string) {
    this.router.navigateByUrl('/search/' + searchTerm);
  }
}
