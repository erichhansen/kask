import {Observable, Subject, ReplaySubject} from 'rxjs/Rx';
import {Http} from '@angular/http';
import {Injectable} from '@angular/core';
import {TapSession} from "../models/session.model";

@Injectable()
export class StatsService {
    constructor(
        private http: Http
    ) {}

    pours: Subject<any[]> = new ReplaySubject(1);
    sessions: Subject<TapSession[]> = new ReplaySubject(1);
    
    observePours(): Observable<any[]> {
        return this.pours;
    }
    
    observeSessions(): Observable<TapSession[]> {
        return this.sessions;
    }
    
    getPours(fromDate: string, toDate: string): Observable<any[]> {
        let url = `/api/stats/pours?fromDate=${fromDate}&toDate=${toDate}`;
        
        return this.http.get(url)
            .map(res => res.json().Pours)
            .do(_ => this.pours.next(_));
    }
    
    getSessions(fromDate: string, toDate: string): Observable<TapSession[]> {
        let url = `/api/stats/sessions?fromDate=${fromDate}&toDate=${toDate}`;
        
        return this.http.get(url)
            .map(res => res.json().Sessions)
            .do(_ => this.sessions.next(_));
    }
}
