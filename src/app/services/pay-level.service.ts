import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import { PayLevel } from '../domain/pay-level.model';

@Injectable()
export class PayLevelService {
    private payLevelUrl = 'estimate-worksheet/paylevels';

    constructor(
        private http: Http
    ) { }

    fetchAllPayLevel(): Promise<PayLevel[]> {
        // const url = `${this.payLevelUrl}`;
        return this.http.get(this.payLevelUrl).toPromise().then(response=>{
            return this.extractData(response);
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
}