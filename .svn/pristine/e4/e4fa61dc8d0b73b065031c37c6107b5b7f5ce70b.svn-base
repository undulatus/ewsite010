import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Observable } from "rxjs/Observable";

@Injectable()
export class GlobalEventsService {

    private _showMenu: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
    public showMenuEmitter: Observable<boolean> = this._showMenu.asObservable();
    private _showNav: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
    public showNavEmitter: Observable<boolean> = this._showNav.asObservable();
    constructor() {}

    showMenu(ifShow: boolean) {
        this._showMenu.next(ifShow);
    }
    showNav(ifShow: boolean){
        this._showNav.next(ifShow);
    }

}