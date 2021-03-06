import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import { Practice } from '../domain/practice.model';

@Injectable()
export class PracticeService {
    private practiceUrl = 'estimate-worksheet/practices';
    private roleUrl = 'estimate-worksheet/roles';

    constructor(
        private http: Http
    ) { }

    fetchAllPractice(): Observable<Practice[]> {
        // const url = `${this.practiceUrl}`;
        return this.http.get(this.practiceUrl)
        .map(response=>this.extractData(response))
        .catch(this.handleObservableError);
    }

    fetchPracticesByRoleId(value): Observable<Practice[]> {
        const url = this.roleUrl + '/' + value + '/practices';
        return this.http.get(url)
        .map(response=>this.extractData(response))
        .catch(this.handleObservableError);
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