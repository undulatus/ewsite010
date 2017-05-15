import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Employee } from './employee.model';

@Injectable()
export class EmployeeListService {
    private headers = new Headers({ 'Content-Type': 'application/json' });
    private employeesUrl = 'api/employees';
    private myemployeesURL = 'employees';
    private otheremployeesURL = 'employees/other';

    constructor(private http: Http) { }

    findAll(): Promise<Employee[]> {
        const url = `${this.myemployeesURL}`;
        console.log("return is " + this.http.get(url));
        return this.http.get(url).toPromise().then(response => response.json().data as Employee[]).catch(this.handleError);
    }
    fetchDataByLastName(lastname: string): Promise<Employee[]> {
        const url = `${this.otheremployeesURL}/${lastname}`;
        return this.http.get(url).toPromise().then(response => response.json().data as Employee[]).catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}