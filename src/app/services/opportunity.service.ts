import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { AuthHttp } from 'angular2-jwt';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import { Opportunity } from '../domain/opportunity.model';
import { OpportunityActivity } from '../domain/opportunity-activity.model';
import { Employee } from "../domain/employee.model";


@Injectable()
export class OpportunityService {
    private opportunityUrl = 'estimate-worksheet/opportunities';
    private shareOpportunityUrl = 'estimate-worksheet/opportunities';

    constructor(
        private http: Http,
        private authHttp: AuthHttp
    ) { }

    fetchAllOpportunities(): Promise<Opportunity[]> {
        // const url = `${this.opportunityUrl}`;
        return this.http.get(this.opportunityUrl).toPromise().then(response => {
            return this.extractData(response);
        }).catch(this.handlePromiseError);
    }

    fetchOpportunity(value): Observable<Opportunity> {
        const url = this.opportunityUrl + '/' + value;
        return this.http.get(url).map(response => {
            return this.extractData(response);
        }).catch(this.handleObservableError);
    }

    saveOpportunity(opportunity: Opportunity): Promise<Opportunity> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.opportunityUrl, opportunity , options).toPromise().then(response => {
            return this.extractData(response);
        }).catch(this.handlePromiseError);
    }

    updateOpportunity(opportunity: Opportunity): Observable<Opportunity> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        const url = this.opportunityUrl + '/' + opportunity.opportunityId;

        return this.http.put(url, opportunity, options)
            .map(response => this.extractData(response))
            .catch(this.handleObservableError);
    }

    updateOpportunityOnChangeStartDateOrDuration(opportunity: Opportunity, isDateChanged: Boolean, granularity: string): Observable<Opportunity>{
        if(!isDateChanged){
            if(granularity == "monthly"){
                opportunity.durationInWeeks = opportunity.durationInWeeks * 4;
            }
        }
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        const url = this.opportunityUrl + '/' + opportunity.opportunityId + '?dateChanged=' + isDateChanged;
        return this.http.put(url, opportunity, options)
            .map(response => this.extractData(response))
            .catch(this.handleObservableError);

    }

    saveOpportunityforSharing(opportunity: Opportunity, employeeTags: any[]): Observable<Opportunity[]> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        const url = this.shareOpportunityUrl + '/' + opportunity.opportunityId + '/opportunitycollaborators/' + opportunity.permission;
        return this.http.post(url, employeeTags, options)
            .map(response => this.extractData(response))
            .catch(this.handleObservableError);
    }

    updateOpportunityWithLoadedActivities(opportunity: Opportunity): Observable<OpportunityActivity[]> {
        // console.log("++++++++++++++++++++++++");
        // console.log("opportunity service opportunity: ", opportunity);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        const url = this.opportunityUrl + '/' + opportunity.opportunityId + '/servicetypes/' + opportunity.serviceType.serviceTypeId;

        return this.http.put(url, opportunity, options).map(
            this.extractData).catch(this.handlePromiseError);
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