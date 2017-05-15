import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable, BehaviorSubject } from 'rxjs';
import 'rxjs/add/operator/map'

import { JwtHelper } from 'angular2-jwt';

import { LocalStorageService } from 'angular-2-local-storage';
import { User } from '../domain/user.model';
import { GlobalEventsService } from "../utils/index";

@Injectable()
export class AuthenticationService {
    currentUser: User;
    isLoginSubject = new BehaviorSubject<boolean>(this.hasToken());
    private googleAuth: any;
    private baseUrl: any = {};
    token: string;

    private jwtHelper: JwtHelper = new JwtHelper();

    constructor(
        private http: Http,
        private router: Router,
        private globalEventsService: GlobalEventsService,
        private localStorageService: LocalStorageService) {

    }


    isLoggedIn(): Observable<boolean> {
        return this.isLoginSubject.asObservable().share();
    }
    doThis(loggedInUser: any) {
        let profile = loggedInUser.getBasicProfile();
        console.log(profile.getName());
        console.log(loggedInUser.isSignedIn());
        this.currentUser = {
            username: profile.getName(),
            imageUrl: profile.getImageUrl(),
            systemRole: '',
            employeeId: 0
        };
        this.localStorageService.set('currentUser', JSON.stringify(this.currentUser));
        this.isLoginSubject.next(true);
        this.globalEventsService.showMenu(true);
        this.globalEventsService.showNav(true);

        this.localStorageService.set('token', loggedInUser.getAuthResponse().id_token);
    }

    // NOTE: this snippet is for pw-auth
    // login(loggedInUser: any): Promise<boolean> {
    //     let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    //     let options = new RequestOptions({ headers: headers });
    //     let idTokenString = loggedInUser.getAuthResponse().id_token;
    //     var params = 'googleToken=' + idTokenString;
    //     //return this.http.post(`${'pw-auth/google/authenticate'}`, params, options)
    //     return this.http.post('http://localhost:8081/pw-auth/google/authenticate', params, options)
    //         .toPromise().then((response: Response )=> {
    //             if (response.ok) {
    //                 let pwToken = <any>response.json();
    //                 console.log(pwToken);
    //                 if (pwToken && pwToken.token) {
    //                     console.log(pwToken.token);
    //                     let profile = loggedInUser.getBasicProfile();
    //                     console.log(profile.getName());
    //                     console.log(loggedInUser.isSignedIn());
    //                     this.currentUser = {
    //                         username: profile.getName(),
    //                         imageUrl: profile.getImageUrl(),
    //                         systemRole: '',
    //                         employeeId: 0
    //                     };
    //                     this.localStorageService.set('currentUser', JSON.stringify(this.currentUser));
    //                     this.isLoginSubject.next(true);
    //                     this.globalEventsService.showMenu(true);
    //                     this.globalEventsService.showNav(true);

    //                     this.localStorageService.set('token', pwToken.token);
    //                     localStorage.setItem('ew-site:token', pwToken.token);

    //                     return true;
    //                 }
    //                 return false;
    //             }
    //             return false;
    //         }).catch(this.handlePromiseError);
    // }

    // NOTE this snippet is to bypass pw-auth login, for now
    login(loggedInUser: any): Promise<boolean> {
        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        let options = new RequestOptions({ headers: headers });
        let idTokenString = loggedInUser.getAuthResponse().id_token;
        console.log(idTokenString);
        var googleValidatorParams = 'idTokenString=' + idTokenString;
        var params = 'googleToken=' + idTokenString;
        //call Google-Token Validator
        return this.http.post(`${'googletoken-validator/tokensignin'}`, googleValidatorParams, options).toPromise().then(
            (response: Response) => {
                if (response.ok) {
                    let isGoogleToken = response.json();
                    console.log('isvalidgoogletoken: ' + isGoogleToken);
                    //check if valid google token
                    //if (isGoogleToken) {
                    let profile = loggedInUser.getBasicProfile();
                    console.log(profile.getName());
                    console.log(loggedInUser.isSignedIn());
                    this.currentUser = {
                        username: profile.getName(),
                        imageUrl: profile.getImageUrl(),
                        systemRole: '',
                        employeeId: 0
                    };
                    this.localStorageService.set('currentUser', JSON.stringify(this.currentUser));
                    this.isLoginSubject.next(true);
                    this.globalEventsService.showMenu(true);
                    this.globalEventsService.showNav(true);

                    return true;
                   
                } else {
                    console.log('Google Sign-in Error');
                    return false;
                }
            }).catch(this.handlePromiseError);



    }

    private extractData(res: Response) {
        let body = res.json();
        return body || {};
    }

    private handlePromiseError(error: any): Promise<any> {
        console.error('Error: ', error);
        return Promise.reject(error.message || error);
    }
    /*login(username: string, password: string) {
        return this.http.post('/api/authenticate', JSON.stringify({ username: username, password: password }))
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let user = response.json();
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    this.localStorageService.set('currentUser', JSON.stringify(user));
                    this.currentUser = user;
                    this.isLoginSubject.next(true);
                    this.globalEventsService.showMenu(true);
                    this.globalEventsService.showNav(true);
                }
            });
    }*/

    logout() {
        // remove user from local storage to log user out
        /*if(this.googleAuth !== null && this.googleAuth != undefined){
            this.googleAuth.signOut();
        }*/
        this.localStorageService.remove('currentUser');
        this.localStorageService.remove('googleUser');
        this.localStorageService.remove('token');
        localStorage.removeItem('ew-site:token');
        this.globalEventsService.showNav(false);
        this.globalEventsService.showMenu(false);

        this.router.navigate(['/login']);
    }
    hideNavBar() {
        this.globalEventsService.showNav(false);
    }


    getCurrentUser() {
        if (this.currentUser) {
            return this.currentUser;
        } else {
            var currU = this.localStorageService.get('currentUser');
            if (currU) {
                this.currentUser = JSON.parse(currU.toString());
                return this.currentUser;
            } else {
                return null;
            }
        }
    }

    loggedIn() {
        // NOTE: this snippet is for pw-auth
        // let token = <string>this.localStorageService.get('token');
        // if (token) {
        //     let expired = this.jwtHelper.isTokenExpired(token);
        //     console.log("Token: "+expired);
        //     //return expired; // FIXME: should check expiration
        //     return true;
        // }
        // return false;

        // This code is to bypass pw-auth login, for now
        let token = this.localStorageService.get('currentUser');
        if (token) {
            /*let expired = this.jwtHelper.isTokenExpired(token);
            console.log("Token: " + expired);*/
            //return expired; // FIXME: should check expiration
            return true;
        }
        return false;
    }

    private hasToken(): boolean {
        console.log(!!this.localStorageService.get('currentUser'));
        return !!this.localStorageService.get('currentUser');
    }
}