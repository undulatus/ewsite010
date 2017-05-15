import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import { Activity } from '../domain/activity.model';

@Injectable()
export class ActivityService {
    private activityUrl = 'estimate-worksheet/activities';
    private servicetypeUrl = 'estimate-worksheet/servicetypes';

    constructor(
        private http: Http
    ) { }

    fetchAllActivity(): Promise<Activity[]> {
        // const url = `${this.activityUrl}`;
        return this.http.get(this.activityUrl).toPromise().then(response=>{
            return this.extractData(response);
        }).catch(this.handlePromiseError);
    }

    fetchActivitiesByServiceTypeId(value): Promise<Activity[]> {
        const url = this.servicetypeUrl + '/' + value + '/activities';
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