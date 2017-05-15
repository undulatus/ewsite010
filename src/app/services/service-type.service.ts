import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import { ServiceType } from '../domain/service-type.model';

@Injectable()
export class ServiceTypeService {
    private serviceTypeUrl = 'estimate-worksheet/servicetypes';

    constructor(
        private http: Http
    ) { }

    fetchAllServiceType(): Promise<ServiceType[]> {
        // const url = `${this.serviceTypeUrl}`;
        return this.http.get(this.serviceTypeUrl).toPromise().then(response=>{
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