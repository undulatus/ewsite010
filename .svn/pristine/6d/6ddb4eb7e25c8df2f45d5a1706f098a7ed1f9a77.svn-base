import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import { BusinessUnit } from '../domain/business-unit.model';

@Injectable()
export class BusinessUnitService {
    private businessunitUrl = 'estimate-worksheet/businessunits';

    constructor(
        private http: Http
    ) { }

    fetchAllBusinessUnit(): Promise<BusinessUnit[]> {
        // const url = `${this.businessunitUrl}`;
        return this.http.get(this.businessunitUrl).toPromise().then(response=>{
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