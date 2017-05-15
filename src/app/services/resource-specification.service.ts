import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import { ResourceSpecification } from '../domain/resource-specification.model';
import { OpportunityActivity } from '../domain/opportunity-activity.model';

@Injectable()
export class ResourceSpecificationService {
    private resourcespecificationUrl = 'estimate-worksheet/resourcespecifications';
   
    constructor(
        private http: Http
    ) { }

    fetchResourceSpecifications(): Promise<ResourceSpecification[]> {
        // const url = `${this.resourcespecificationUrl}`;
        return this.http.get(this.resourcespecificationUrl).toPromise().then(response=>{
            return this.extractData(response);
        }).catch(this.handlePromiseError);
    }

    fetchResourceSpecification(value): Promise<ResourceSpecification[]> {
        const url = this.resourcespecificationUrl + '/' + value;
        return this.http.get(url).toPromise().then(response=>{
            return this.extractData(response);
        }).catch(this.handlePromiseError);
    }

    saveResourceSpecification(resourceSpecification: ResourceSpecification): Promise<ResourceSpecification> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.resourcespecificationUrl, resourceSpecification, options).toPromise().then(response => {
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