import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import { Opportunity } from '../domain/opportunity.model';

@Injectable()
export class OpportunityService {
    private opportunityUrl = 'estimate-worksheet/opportunities';

    constructor(
        private http: Http
    ) { }

    fetchAllOpportunities(): Promise<Opportunity[]> {
        // const url = `${this.opportunityUrl}`;
        return this.http.get(this.opportunityUrl).toPromise().then(response => {
            return this.extractData(response);
        }).catch(this.handlePromiseError);
    }

    fetchOpportunity(value): Promise<Opportunity> {
        const url = this.opportunityUrl + '/' + value;
        return this.http.get(url).toPromise().then(response=>{
            return this.extractData(response);
        }).catch(this.handlePromiseError);
    }

    saveOpportunity(opportunity: Opportunity): Promise<Opportunity> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.opportunityUrl, { opportunity }, options).toPromise().then(response => {
            return this.extractData(response);
        }).catch(this.handlePromiseError);
    }

    updateOpportunity(opportunity: Opportunity): Promise<Opportunity> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        const url = this.opportunityUrl + '/' + opportunity.opportunityId;

        return this.http.put(url, opportunity, options).toPromise().then(response => {
            return this.extractData(response);
        }).catch(this.handlePromiseError);
    }

    updateOpportunityWithLoadedActivities(opportunity: Opportunity): Promise<Opportunity> {
        // console.log("++++++++++++++++++++++++");
        // console.log("opportunity service opportunity: ", opportunity);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        const url = this.opportunityUrl + '/' + opportunity.opportunityId + '/servicetypes/' + opportunity.serviceType.serviceTypeId;

        return this.http.put(url, opportunity, options).toPromise().then(response => {
            // console.log("response: ", response);
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