import { Injectable } from '@angular/core';
import { Router, CanActivate,CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthenticationService } from './auth.service';

import { LocalStorageService } from 'angular-2-local-storage';

@Injectable()
export class AuthGuard implements CanActivate{
 
    constructor(private router: Router,
        private authService: AuthenticationService,
        private localStorageService: LocalStorageService) { }
 
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.authService.loggedIn()) {
            return true;
        }
 
        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        return false;
    }

}