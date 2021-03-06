import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import { PayLevel } from '../domain/pay-level.model';
import { Observable } from 'rxjs/Rx';
@Injectable()
export class PayLevelService {
    private payLevelUrl = 'estimate-worksheet/paylevels';

    constructor(
        private http: Http
    ) { }

    fetchAllPayLevel(): Observable<PayLevel[]> {
        // const url = `${this.payLevelUrl}`;
        return this.http.get(this.payLevelUrl)
        .map(response=> this.extractData(response)
        ).catch(this.handleObservableError);
    }

    private extractData(res: Response) {
        let body = res.json();
        return body || {};
    }
    
    private handlePromiseError(error: any): Promise<any> {
        console.error('Error: ', error);
        return Promise.reject(error.message || error);
    }

    private handleObservableError(error: any): Observable<any> {
        console.error('The Error is', error.toString());
        return Observable.throw(error.json() || 'Server error')
    }
}