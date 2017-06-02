import {Injectable} from '@angular/core';
import {Http, Response, RequestOptions, Headers} from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import {Employee} from '../domain/employee.model';
import {Observable} from 'rxjs/Rx';
import { OpportunityCollaborator } from '../domain/opportunity-collaborator.model';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { map } from "rxjs/operator/map";



@Injectable()
export class EmployeeService {
    private employeeUrl = 'pw-auth/employees';
    private shareEmployeeUrl = 'estimate-worksheet/opportunities'


    constructor(private http: Http){}

fetchAllEmployee(): Observable<Employee[]> {

    console.log("url is: ",this.employeeUrl);
    return this.http.get(this.employeeUrl)
    .map(response => this.extractData(response))
    .catch(this.handleObservableError);
}

fetchOpportunityCollaborators(opportunityId: number): Observable<OpportunityCollaborator> {
    const url = this.shareEmployeeUrl + '/' + opportunityId + '/opportunitycollaborators';
    return this.http.get(url)
    .map(this.extractData)
    .catch(this.handleObservableError);
}

private extractData(res: Response) {
    let body = res.json();
    return body || {};
}

private handleObservableError(error: any): Observable<any>{
    console.error('The Error is', error.toString());
    return Observable.throw(error.json()||'Server error')
}

}





