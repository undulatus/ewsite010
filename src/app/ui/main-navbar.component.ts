import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { User } from '../domain/user.model';
import { AuthenticationService } from '../guard';
import { GlobalEventsService } from "../utils";

@Component({
  selector: 'main-navbar',
  templateUrl: './main-navbar.component.html',
  styleUrls: ['./main-navbar.component.css']
})
export class MainNavBarComponent implements OnInit {
  showNav: boolean = false;
  currentUser: User;

  constructor(private router: Router, private globalEventsService: GlobalEventsService, private authService: AuthenticationService) { }
  ngOnInit() {
    this.globalEventsService.showNavEmitter.subscribe((mode) => {
      // mode will be null the first time it is created, so you need to igonore it when null
      if (mode !== null) {
        this.showNav = mode;
        this.showNavBar(mode);
      }
    });

    // have a better implementation instead of this
    this.router.events
      .filter(event => event instanceof NavigationEnd)
      .subscribe((event: NavigationEnd) => {
        console.log('navbar:' + event);
        if (event.url.indexOf('login') > -1) {
          this.showNav = false;
        } else {
          this.showNav = true;
          this.showNavBar();
        }
      });
  }
  
  public showNavBar(show:boolean=true) {
    this.showNav = show;
    if (show) {
      this.currentUser = this.authService.getCurrentUser();
      if (this.currentUser == null) {
        this.showNav = false;
      }
    }
  }
  
}