import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import { Opportunity } from '../domain/opportunity.model';
import { Version } from '../domain/version.model';

@Injectable()
export class VersionService {
    private opportunityUrl = 'estimate-worksheet/opportunities';

    constructor(
        private http: Http
    ) { }


    
    saveVersion(opportunityId: number, value: number): Observable<Opportunity> {
        let headers = new Headers({ 'Content-Type' : 'application/json'});
        let options = new RequestOptions({ headers: headers});
        const url = this.opportunityUrl + '/' + opportunityId + '/versions';

        return this.http.post(url, value, options)
            .map(response => this.extractData(response))
            .catch(this.handleObservableError);
    }

    revertVersion(oppportunityId: number, versionName: string): Observable<Opportunity>{
        let headers = new Headers({ 'Content-Type' : 'application/json'});
        let options = new RequestOptions({ headers: headers});
        const url = this.opportunityUrl + '/' + oppportunityId + '/versions/' + versionName + '/revert';

        return this.http.post(url, options)
            .map(response => this.extractData(response))
            .catch(this.handleObservableError);
    }

    fetchOpportunityVersions(opportunityId): Observable<Version[]> {
        let headers = new Headers({ 'Content-Type' : 'application/json'});
        let options = new RequestOptions({ headers: headers});
        const url = this.opportunityUrl + '/' + opportunityId + '/versions';

        return this.http.get(url)
            .map(response => this.extractData(response))
            .catch(this.handleObservableError);
    }



    fetchVersion(opportunityId, value): Observable<Opportunity> {
        let headers = new Headers({ 'Content-Type' : 'applicaton/json'});
        let options = new RequestOptions({ headers: headers});
        const url = this.opportunityUrl + '/' + opportunityId + '/versions/' + value;

        return this.http.get(url)
            .map(response => this.extractData(response))
            .catch(this.handleObservableError);
    }

    //revertVersion()
   
    

    

    private extractData(res: Response) {
        let body = res.json();
        return body || {};
    }


    private handleObservableError(error: any): Observable<any> {
        console.error('The Error is', error.toString());
        return Observable.throw(error.json() || 'Server error')
    }

}