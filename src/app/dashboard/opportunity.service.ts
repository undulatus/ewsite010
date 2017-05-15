import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';

import { AuthHttp } from 'angular2-jwt';

import { Opportunity } from '../domain/opportunity.model';

@Injectable()
export class OpportunityListService {
    private headers = new Headers({ 'Content-Type': 'application/json' });
    private baseUrl = 'estimate-worksheet/users';
    private contextPath = "estimate-worksheet";
    constructor(private authHttp: AuthHttp) { }

    getOwnedOpportunities(userName): Promise<Opportunity[]> {
        const url = `${this.baseUrl}/${userName}/opportunities`;
        return this.authHttp.get(url).toPromise().then(response=>{
            console.log('getMyOpportunities response: ', response);
            return this.extractData(response);
        }).catch(this.handlePromiseError);
    }
    getOpportunities(userName): Promise<Opportunity[]> {
        const url = `${this.baseUrl}/${userName}/opportunities/other`;
        return this.authHttp.get(url).toPromise().then(response=>{
            console.log('getOtherOpportunities response: ', response);
            return this.extractData(response);
        }).catch(this.handlePromiseError);
    }

    updateOpportunityStatus(isLocked: boolean, opportunityId:number): Promise<number>{
        const url = `${this.contextPath}/opportunities/${opportunityId}/lock/${isLocked}`;
        return this.authHttp.post(url, {}).toPromise().then(response => {
            return this.extractData(response);
        }).catch(this.handlePromiseError);
    }

    private extractData(res: Response) {
        console.log(res.json());
        let body = res.json();
        return body || {};
    }

    private handlePromiseError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}