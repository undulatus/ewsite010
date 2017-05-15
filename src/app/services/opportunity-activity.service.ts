import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import { OpportunityActivity } from '../domain/opportunity-activity.model';

@Injectable()
export class OpportunityActivityService {
    private opportunityActivityUrl = 'estimate-worksheet/opportunityactivities';

    constructor(
        private http: Http
    ) { }

    fetchAllOpportunityActivities(): Promise<OpportunityActivity[]> {
        // const url = `${this.opportunityActivityUrl}`;
        return this.http.get(this.opportunityActivityUrl).toPromise().then(response => {
            return this.extractData(response);
        }).catch(this.handlePromiseError);
    }

    fetchOpportunityActivity(value): Promise<OpportunityActivity> {
        const url = this.opportunityActivityUrl + '/' + value;
        return this.http.get(url).toPromise().then(response=>{
            return this.extractData(response);
        }).catch(this.handlePromiseError);
    }

    deleteOpportunityActivity(opportunityActivityId: number): Promise<OpportunityActivity> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        const url = this.opportunityActivityUrl + '/' + opportunityActivityId;

        return this.http.delete(url, options).toPromise().then(response => {
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

