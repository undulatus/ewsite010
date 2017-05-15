import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import { Role } from '../domain/role.model';

@Injectable()
export class RoleService {
    private roleUrl = 'estimate-worksheet/roles';
    private servicetypeUrl = 'estimate-worksheet/servicetypes';
   
    constructor(
        private http: Http
    ) { }

    fetchAllRole(): Promise<Role[]> {
        // const url = `${this.roleUrl}`;
        return this.http.get(this.roleUrl).toPromise().then(response=>{
            return this.extractData(response);
        }).catch(this.handlePromiseError);
    }

    fetchRolesByServiceTypeId(value): Promise<Role[]> {
        const url = this.servicetypeUrl + '/' + value + '/roles';
        return this.http.get(url).toPromise().then(response=>{
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