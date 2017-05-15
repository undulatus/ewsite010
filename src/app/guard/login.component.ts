/// <reference path="../../../node_modules/@types/gapi.auth2/index.d.ts" />

import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from './auth.service';
import { LocalStorageService } from 'angular-2-local-storage';
import { User } from '../domain/user.model';
import { NgZone } from '@angular/core';

import { CLIENT_ID } from '../utils/constants';

declare const gapi: any;
@Component({
    moduleId: module.id,
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.css']
})

export class LoginComponent implements OnInit, AfterViewInit {
    public auth2: any;

    returnUrl: string;
    profile: any = {};
    currentUser: User;

    private myClientId: string = CLIENT_ID;
    private _isLoggedIn: boolean = false;
    
    constructor(
        private zone: NgZone,
        private route: ActivatedRoute,
        private router: Router,
        private localStorageService: LocalStorageService,
        private authenticationService: AuthenticationService
    ) { }

    ngOnInit() {
        // reset login status
        this.authenticationService.logout();

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    ngAfterViewInit() {
        this.initGoogleAuthApi();
    }

    private initGoogleAuthApi() {
        console.log("Google API init..");
        
        let element = document.getElementById('glogin');
        gapi.load('auth2', () => {
            this.auth2 = gapi.auth2.init({
                client_id: this.myClientId,
                cookiepolicy: 'single_host_origin',
                scope: 'profile email'
            });

            this.auth2.attachClickHandler(element, {},
                (googleUser) => {
                    if (googleUser.isSignedIn()) {
                        console.log("Signed in via Google");
                        this.authenticationService.login(googleUser).then(data => {
                            this.localStorageService.set("googleUser", googleUser);
                            this.router.navigate(["/home"]);
                            console.log("Should have navigated to /home");
                        });
                    }

                    // if (googleUser.isSignedIn()) {
                    //     console.log("Signed in via Google");
                    //     this.authenticationService.doThis(googleUser);
                    //     this.localStorageService.set("googleUser", googleUser);
                    //     this.router.navigate(["/home"]);
                    //     console.log("Should have navigated to /home");
                    // }
                }, function (error) { // TODO
                    // alert(JSON.stringify(error, undefined, 2));
                }
            );
        })
        
    }
}